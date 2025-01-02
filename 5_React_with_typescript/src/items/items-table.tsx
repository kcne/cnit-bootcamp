import { useEffect, useState } from "react";
import { Item } from "./item-types";
import { fetchItems } from "../api/items-api";

function ItemsTable (){
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const fetchedItems = await fetchItems();
    if (fetchedItems) {
      setItems(fetchedItems);
    } else {
      setError("Failed to fetch items.");
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    {
    error &&
    <div className=" text-lg text-red-500 text-center">
    {error}
    </div>
    }
    </div>
  );
};

export default ItemsTable;
