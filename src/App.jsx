import React from "react";
import { useEffect, useState } from "react";
import { ShoppingList, ItemForm } from "./Components";
import { getItems } from "./utils/index.js";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [items, setItems] = React.useState([]);

  const refreshItems = () => {
    return getItems()
      .then((itemsData) => {
        itemsData.sort((a, b) => a.name.localeCompare(b.name));
        setItems(itemsData);
        return;
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        return;
      });
  };

  useEffect(() => {
    // Init the app by grabbing all the items so we can display them
    refreshItems();
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

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

      <ShoppingList items={items} refresh={refreshItems} />

      <ItemForm refresh={refreshItems} />

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
