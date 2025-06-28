import { ShoppingItem } from "./index";

export const ShoppingList = ({ items, refresh, toast }) => {
  return (
    <div class="container mt-5">
      <table class="table table-bordered table-striped w-100">
        <thead class="table-dark">
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Qty</th>
            <th class="text-center">Note</th>
            <th class="text-center">Actions</th>
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
