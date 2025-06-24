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
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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

const auth = getAuth(app);

// Login function using env vars for dev/test
export async function login() {
  const email = import.meta.env.VITE_TEST_USER_EMAIL;
  const password = import.meta.env.VITE_TEST_USER_PASSWORD;

  if (!email || !password) {
    console.warn("No test credentials set; skipping login.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in UID:", userCredential.user.uid);
  } catch (error) {
    console.error("Login failed", error);
  }
}

// Used for dev level login with user credentials for a locked doen firestore table
await login();

// You can also listen for auth state changes anywhere in your app:
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user.uid);
  } else {
    console.log("No user signed in");
  }
});

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

const getSameItems = (currItem) => {
  const q = query(collection(db, "items"), where("name", "==", currItem.name));
  db.collection("items")
    .where("name", "==", currItem.name)
    .get()
    .then((doc) => {
      if (doc.exists) {
        currItem.qty += doc.qty;
      }
    });
  if (q.ex) {
    // TODO: FINISH THIS
    return 1;
  }
};

export const addItemFirebase = (item) => {
  // item comes in withupdated properties
  // TODO: Validate item properties before adding
  // TODO: If already exists combine, dont overwrite
  const existingItems = getSameItems();

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
