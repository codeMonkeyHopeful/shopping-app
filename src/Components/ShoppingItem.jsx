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
    <tr>
      <td className="text-center">{item.name}</td>
      <td className="text-center">{item.qty}</td>
      <td className="text-center">{item.notes}</td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
