import React from "react";
import { useState } from "react";
import { addItemFirebase } from "../firebase";

export const InputForm = () => {
  const [input, setInput] = useState("");

  // TODO: Add more inpusts and capture them

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return; // Prevent adding empty items
    addItemFirebase(input.trim())
      .then((res) => {
        // Successfully added item
        return res;
      })
      .catch((error) => {
        // Handle error adding item
        console.error(`Error adding item: ${error}`);
      });
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Add new item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
