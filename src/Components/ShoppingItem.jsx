import { removeItem } from "./index";
import React, { useState } from "react";

export const ShoppingItem = ({ item, refresh, toast }) => {
  const [status, setStatus] = useState("view");

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
        <input type="text" className="form-control" value={item.name} />
      </td>
      <td className="text-center">
        <input type="text" className="form-control" value={item.qty} />
      </td>
      <td className="text-center">
        <input type="text" className="form-control" value={item.notes} />
      </td>
      <td className="text-center d-flex justify-content-around w-100">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleUpdate(item)}
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
