import React from "react";

export const InputForm = () => {
  return (
    <form className="d-flex gap-2" onSubmit={addItem}>
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
