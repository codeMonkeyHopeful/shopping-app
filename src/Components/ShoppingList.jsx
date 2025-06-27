import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { ShoppingItem } from "./index";
import { getItems } from "./index";

export const ShoppingList = () => {
  const [items, setItems] = React.useState([]);

  // useEffect(() => {
  // Init the app by grabbing all the items so we can display them
  //   const unsubscribe = onSnapshot(
  //     collection(db, "items"),
  //     (snapshot) => {
  //       const itemsData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       itemsData.sort((a, b) => a.name.localeCompare(b.name));
  //       setItems(itemsData);
  //     },
  //     (error) => {
  //       console.error("Error fetching items:", error);
  //     }
  //   );
  //   // Cleanup function to unsubscribe from the snapshot listener
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    // Init the app by grabbing all the items so we can display them
    getItems()
      .then((itemsData) => {
        itemsData.sort((a, b) => a.name.localeCompare(b.name));
        setItems(itemsData);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <ul className="list-group mb-4">
      {items.map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          setItems={setItems}
          items={items}
        />
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
