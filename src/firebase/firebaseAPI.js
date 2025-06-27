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

import { db } from "./index.js";

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

const getSameItems = async (currItem) => {
  const q = query(collection(db, "items"), where("name", "==", currItem.name));
  console.log(`Getting items with name: ${currItem}`);
  const updatedItem = getDocs(q)
    .then((docs) => {
      if (docs) {
        docs.forEach((doc) => {
          currItem.qty += doc.data().qty;
          removeItemFirebase(doc.id)
            .then((res) => {
              console.log(`Removed item with id: ${doc.id}`);
            })
            .catch((error) => {
              console.error(`Error removing item with id: ${doc.id}, ${error}`);
            });
        });
      }
      return currItem;
    })
    .catch((error) => {
      console.error(
        `Error getting items with name: ${currItem.name}, ${error}`
      );
    });

  return updatedItem;
};

export const addItemFirebase = (item) => {
  return getSameItems(item).then((updatedItem) => {
    return addDoc(collection(db, "items"), {
      ...updatedItem,
      updated: serverTimestamp(),
    })
      .then((res) => {
        console.log(res);
        return { status: `add`, item: updatedItem };
      })
      .catch((error) => {
        console.error(`Error adding item: ${item}, ${error}`);
        return { status: `error`, item, error };
      });
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
