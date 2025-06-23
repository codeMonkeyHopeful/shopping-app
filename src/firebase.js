import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
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
  // TODO: Validate item properties before adding
  // TODO: If already exists combine, dont overwrite
  

  // TODO Parse properly once inputs exist and add the server time to keep all timelines the same
  return addDoc(collection(db, "items"), { ...item, upated: serverTimestamp() })
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
      const formattedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      formattedItems.sort((a, b) => a.name.localeCompare(b.name));
      return formattedItems;
    })
    .catch((error) => {
      console.error(`Error getting items: ${error}`);
      return [];
    });
  return items;
};

export const updateItemFirebase = async (id, item) => {
  const itemDoc = doc(db, "items", id);
  await updateDoc(itemDoc, item);
};

export const getItemsByCategoryFirebase = (key, val) => {};
