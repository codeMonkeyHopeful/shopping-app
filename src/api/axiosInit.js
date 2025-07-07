import axios from "axios";

// Create the instance we will tailor to the app.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const SHARED_SECRET = import.meta.env.VITE_SHARED_SECRET_HEADER;
let refreshTimeoutId = null;

// In-memory token cache to prevent stale reads from localStorage
let currentAccessToken = null;
let currentRefreshToken = null;

// Helpers to manage tokens
function setTokens({ access_token, refresh_token }) {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    currentAccessToken = access_token;
  }
  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
    currentRefreshToken = refresh_token;
  }
}

function getAccessToken() {
  return currentAccessToken || localStorage.getItem("access_token");
}

function getRefreshToken() {
  return currentRefreshToken || localStorage.getItem("refresh_token");
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

    // Don't retry these endpoints or loop infinitely
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/proxy/init") &&
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
        return api(originalRequest);
      } catch (refreshErr) {
        console.warn("Refresh failed, trying proxy fallback...");

        if (!originalRequest._proxyRetry) {
          originalRequest._proxyRetry = true;

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
            return api(originalRequest);
          } catch (proxyErr) {
            console.error("Proxy fallback failed:", proxyErr);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

// Call this on app startup to get tokens initially if missing
export async function initializeAuth() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  currentAccessToken = accessToken;
  currentRefreshToken = refreshToken;

  if (accessToken && refreshToken) {
    startAutoRefreshTimer();
    return;
  }

  try {
    const res = await api.post("/proxy/init", null, {
      headers: {
        "X-Shared-Secret": SHARED_SECRET,
      },
    });
    setTokens(res.data);
    startAutoRefreshTimer();
  } catch (err) {
    console.error("Initial proxy login failed:", err);
    throw err;
  }
}
