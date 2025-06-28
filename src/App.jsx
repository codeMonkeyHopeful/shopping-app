import React from "react";
import { useEffect, useState } from "react";
import { ShoppingList, ItemForm, Toast } from "./Components";
import { getItems } from "./api/index";
import { initializeAuth, api } from "./api";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [items, setItems] = React.useState([]);

  const refreshItems = () => {
    return getItems()
      .then((itemsData) => {
        console.log("Fetched items:", itemsData);
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
    async function bootstrapApp() {
      try {
        await initializeAuth();
        // Now tokens are set, you can start your API calls
        await refreshItems(); // <-- wait for refreshItems AFTER auth
      } catch (e) {
        console.error("Failed to authenticate on startup", e);
        // Show error UI or retry etc
      }
    }

    bootstrapApp();
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

      <ShoppingList items={items} refresh={refreshItems} toast={Toast} />

      <ItemForm refresh={refreshItems} toast={Toast} />

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
