import React from "react";
import { removeItem } from "./index";

export const ShoppingItem = ({ item, refresh, toast }) => {
  const handleRemove = (id) => {
    removeItem(id)
      .then((res) => {
        // Successfully removed item
        toast("remove");
        refresh();
        return res;
      })
      .catch((error) => {
        // Handle error removing item
        console.error(`Error removing item: ${error}`);
        toast("error");
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
