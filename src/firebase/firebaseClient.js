import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { loginDevUser } from "./firebaseLogin";

let db = null;
let app = null;

if (import.meta.env.VITE_TEST_USER_EMAIL) {
  const firebaseConfig = {
    apiKey: "AIzaSyC0VyiMXqIt7XiaZLmeCsW6wF60FJZVRQQ",
    authDomain: "shopping-list-9c729.firebaseapp.com",
    projectId: "shopping-list-9c729",
    storageBucket: "shopping-list-9c729.firebasestorage.app",
    messagingSenderId: "386050954721",
    appId: "1:386050954721:web:cc431855e52ec5e3616ea0",
  };

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Dev-only login
  await loginDevUser(app); // ✅ you can await this here
} else {
  console.info("Firebase client SDK is disabled in production.");
}

export { db };
