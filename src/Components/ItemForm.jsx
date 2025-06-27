import React from "react";
import { useState } from "react";
import { addItem } from "./index";

export const ItemForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedNotes = notes.trim();
    const quantity = parseInt(qty, 10);

    if (!trimmedName || quantity < 1) return;

    const itemData = {
      name: trimmedName,
      qty: quantity,
      notes: trimmedNotes,
    };

    addItem(itemData)
      .then((res) => {
        // TODO: Toast message the response
        // Reset form
        setName("");
        setQty(1);
        setNotes("");
        refresh();
        return res;
      })
      .catch((error) => {
        console.error(`Error occured: ${error}`);
      });
  };

  return (
    <form className="d-flex align-items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        className="form-control"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        min="1"
        required
      />
      <input
        type="text"
        className="form-control"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

//
