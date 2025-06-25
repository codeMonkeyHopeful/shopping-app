import React from "react";
import { useEffect, useState } from "react";
import { ShoppingList, ItemForm } from "./Components";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
