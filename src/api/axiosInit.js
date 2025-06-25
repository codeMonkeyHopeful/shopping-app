import axios from "axios";

// Create the instance we will taylor to the app.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const SHARED_SECRET = import.meta.env.VITE_SHARED_SECRET_HEADER;
let refreshTimeoutId = null;

// Helpers to manage tokens
function setTokens({ access_token, refresh_token }) {
  if (access_token) localStorage.setItem("access_token", access_token);
  if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
}

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function startAutoRefreshTimer() {
  if (refreshTimeoutId) return;

  refreshTimeoutId = setTimeout(async () => {
    try {
      const res = await api.post("/auth/refresh", null, {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      });
      setTokens(res.data);
      refreshTimeoutId = null;
      startAutoRefreshTimer();
    } catch (err) {
      console.warn("Auto-refresh failed, attempting proxy login...");
      try {
        const fallback = await api.post("/proxy/init", null, {
          headers: {
            "X-Shared-Secret": SHARED_SECRET,
          },
        });
        setTokens(fallback.data);
        refreshTimeoutId = null;
        startAutoRefreshTimer();
      } catch (finalErr) {
        console.error("Proxy login also failed:", finalErr);
        refreshTimeoutId = null;
      }
    }
  }, 13 * 60 * 1000);
}

// Add access token to outgoing requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401s and attempt refresh + retry
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", null, {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        });

        setTokens(res.data);
        refreshTimeoutId = null;
        startAutoRefreshTimer();

        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest); // 🔁 Retry original request
      } catch (refreshErr) {
        console.warn("Refresh failed, trying proxy fallback...");

        try {
          const fallback = await api.post("/proxy/init", null, {
            headers: {
              "X-Shared-Secret": SHARED_SECRET,
            },
          });

          setTokens(fallback.data);
          refreshTimeoutId = null;
          startAutoRefreshTimer();

          originalRequest.headers.Authorization = `Bearer ${fallback.data.access_token}`;
          return api(originalRequest); // 🔁 Retry again after proxy login
        } catch (proxyErr) {
          console.error("Proxy fallback failed:", proxyErr);
        }
      }
    }

    return Promise.reject(error);
  }
);
