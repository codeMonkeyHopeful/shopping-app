import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace this config with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0VyiMXqIt7XiaZLmeCsW6wF60FJZVRQQ",

  authDomain: "shopping-list-9c729.firebaseapp.com",

  projectId: "shopping-list-9c729",

  storageBucket: "shopping-list-9c729.firebasestorage.app",

  messagingSenderId: "386050954721",

  appId: "1:386050954721:web:cc431855e52ec5e3616ea0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
