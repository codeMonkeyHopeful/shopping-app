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

import { db } from "./firebase/index.js";

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
