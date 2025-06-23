import React from "react";

export const ShoppingItem = ({ item, removeItem }) => {
  return (
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
  );
};
