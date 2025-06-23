import React from "react";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ShoppingList, ItemForm } from "./Components";

const listRef = collection(db, "list");

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Fetch items on mount
  // useEffect(() => {
  //   async function loadItems() {
  //     const snapshot = await getDocs(listRef);
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setItems(data);
  //   }
  //   loadItems();
  // }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Add item to Firestore
  const addItem = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newItem = { name: input.trim() };
    const docRef = await addDoc(listRef, newItem);
    setItems([...items, { ...newItem, id: docRef.id }]);
    setInput("");
  };

  // Trigger install
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Shopping List</h2>

      <ShoppingList />

      <ItemForm />

      {deferredPrompt && (
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleInstallClick}>
            Install App
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
