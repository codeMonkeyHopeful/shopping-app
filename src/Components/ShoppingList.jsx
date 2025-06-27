import React, { useEffect } from "react";
import { ShoppingItem } from "./index";
import { getItems } from "./index";

export const ShoppingList = ({ items, refresh }) => {
  return (
    <ul className="list-group mb-4">
      {items.map((item) => (
        <ShoppingItem key={item.id} item={item} refresh={refresh} />
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
