import { collection, onSnapshot, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";

export const ShoppingList = () => {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const unsubcribe = onSnapshot(
      // Init the app by grabbing all the items so we can display them
      collection(db, "items"),
      (snapshot) => {
        const itemsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      },
      (error) => {
        console.error("Error fetching items: ", error);
      }
    );
    return () => unsubcribe();
  }, []);

  return (
    <ul className="list-group mb-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{item.name}</span>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
