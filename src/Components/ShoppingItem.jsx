import { removeItem, updateItem } from "./index";
import React, { useState } from "react";

export const ShoppingItem = ({ item, refresh, toast }) => {
  const [status, setStatus] = useState("view");
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.qty);
  const [notes, setNotes] = useState(item.notes);

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

  const handleUpdate = (item) => {
    setStatus("update");
  };

  const handleSave = (item) => {
    // Validate input before proceeding
    if (!name || qty < 1) {
      // Invalid input, do not proceed
      toast("error");
      return;
    }
    item.name = name.trim();
    item.qty = parseInt(qty, 10);
    item.notes = notes.trim();

    updateItem(item)
      .then((res) => {
        // Successfully updated item
        toast("update");
        // Reset status to view mode
        setName("");
        setQty(1);
        setNotes("");
        // Reset item state to reflect updated values
        setStatus("view");
        refresh();
        return res;
      })
      .catch((error) => {
        // Handle error updating item
        console.error(`Error updating item: ${error}`);
        toast("error");
        return error;
      });
  };

  return status === "view" ? (
    <tr>
      <td className="text-center">{item.name}</td>
      <td className="text-center">{item.qty}</td>
      <td className="text-center">{item.notes}</td>
      <td className="text-center d-flex justify-content-around w-100">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleUpdate(item)}
        >
          Update
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  ) : (
    <tr>
      <td className="text-center">
        <input
          type="text"
          className="form-control"
          id={`${item.id}-input-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="text-center">
        <input
          type="text"
          className="form-control"
          id={`${item.id}-input-qty`}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </td>
      <td className="text-center">
        <input
          type="text"
          className="form-control"
          id={`${item.id}-input-notes`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </td>
      <td className="text-center d-flex justify-content-around w-100">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSave(item)}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
