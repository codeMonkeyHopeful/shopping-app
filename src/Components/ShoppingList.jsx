import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { ShoppingItem, db } from "./index";

export const ShoppingList = () => {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    // Init the app by grabbing all the items so we can display them
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      },
      (error) => {
        console.error("Error fetching items:", error);
      }
    );
    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, []);

  return (
    <ul className="list-group mb-4">
      {items.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
      {/* Render a placeholder item if the list is empty */}
      {items.length === 0 && (
        <li className="list-group-item text-center">
          No items in your shopping list.
        </li>
      )}
    </ul>
  );
};
