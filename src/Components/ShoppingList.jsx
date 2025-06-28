import { ShoppingItem } from "./index";

export const ShoppingList = ({ items, refresh, toast }) => {
  return (
    <div className="container mt-5">
      <table className="table table-bordered table-striped w-100">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Qty</th>
            <th className="text-center">Note</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              refresh={refresh}
              toast={toast}
            />
          ))}
          {/* Render a placeholder item if the list is empty */}
          {items.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No items in your shopping list.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
