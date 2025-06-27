import React from "react";
import { removeItem } from "./index";

export const ShoppingItem = ({ item, refresh }) => {
  const handleRemove = (id) => {
    removeItem(id)
      .then((res) => {
        // Successfully removed item
        // TODO: Display toast here

        refresh();
        return res;
      })
      .catch((error) => {
        // Handle error removing item
        console.error(`Error removing item: ${error}`);
        // TODO: Display toast here
        return error;
      });
  };
  return (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>{item.name || "undefined"}</span>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleRemove(item.id)}
      >
        Remove
      </button>
    </li>
  );
};
