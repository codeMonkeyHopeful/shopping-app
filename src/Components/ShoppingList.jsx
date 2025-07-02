import { ShoppingItem } from "./index";

export const ShoppingList = ({ items, refresh, toast }) => {
  const tableHeaders = ["Name", "Qty", , "Store", "Note", "Actions"];
  return (
    <div className="container mt-5">
      <table className="table table-bordered table-striped w-100">
        <thead className="table-dark">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="text-center">
                {header}
              </th>
            ))}
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
