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


export const removeItemFirebase  = async (id) => {
}


export const addItemFirebase = async (item) => {
}


export const getItemsFirebase = async () => {
  const snapshot = await getDocs(collection(db, 'items'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export const updateItemFirebase = async (id, item) => {
  const itemRef = doc(db, 'items', id);
  await updateDoc(itemRef, item);
}

