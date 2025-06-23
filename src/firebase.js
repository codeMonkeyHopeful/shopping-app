import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

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

export const removeItemFirebase = (id) => {
  return deleteDoc(doc(db, "items", id))
    .then(() => {
      return { status: `remove`, id };
    })
    .catch((error) => {
      console.error(`Error removing item with id: ${id}, ${error}`);
      return { status: `error`, id, error };
    });
};

export const addItemFirebase = (item) => {
  // item comes in withupdated properties
  return setDoc(doc(db, "items", item.id), {
    ...item,
    updated: Timestamp.now(),
  })
    .then(() => {
      return { status: `add`, item };
    })
    .catch((error) => {
      console.error(`Error adding item: ${item}, ${error}`);
      return { status: `error`, item, error };
    });
};

export const getItemsFirebase = () => {
  const items = getDocs(collection(db, "items"))
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    })
    .catch((error) => {
      console.error(`Error getting items: ${error}`);
      return [];
    });
  return items;
};

export const updateItemFirebase = async (id, item) => {
  const itemRef = doc(db, "items", id);
  await updateDoc(itemRef, item);
};
