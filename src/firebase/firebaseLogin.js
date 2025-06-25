import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export async function loginDevUser(app) {
  const auth = getAuth(app);
  const email = import.meta.env.VITE_TEST_USER_EMAIL;
  const password = import.meta.env.VITE_TEST_USER_PASSWORD;

  if (!email || !password) {
    console.warn("No test credentials found in .env — skipping dev login.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in as:", userCredential.user.uid);
  } catch (error) {
    console.error("Dev login failed", error);
  }

  // Optional: Monitor auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in:", user.uid);
    } else {
      console.log("User signed out");
    }
  });
}
