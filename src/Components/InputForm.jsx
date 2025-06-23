import React from "react";
import { useState } from "react";
import { addItemFirebase } from "../firebase";

export const InputForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  // TODO: Add more inpusts and capture them

  const formatItems = () => {
    const formatted = {
      name: nameInput.trim(),
      qty: quantityInput,
      note: noteInput.trim(),
    };

    return formatted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() === "") return; // Prevent adding empty items

    const inputItems = formatItems();

    addItemFirebase(inputItems)
      .then((res) => {
        // Successfully added item
        return res;
      })
      .catch((error) => {
        // Handle error adding item
        console.error(`Error adding item: ${error}`);
      });

    setNameInput(""); // Clear input field after submission
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Add new item..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
};
//

//  TODO:  Update to a better form that intakes all data

const formPlaceholder = ` <form class="form-inline">
  <div class="form-group mb-2">
    <label for="staticEmail2" class="sr-only">Email</label>
    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com">
  </div>
  <div class="form-group mx-sm-3 mb-2">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary mb-2">Confirm identity</button>
</form> 
`;
