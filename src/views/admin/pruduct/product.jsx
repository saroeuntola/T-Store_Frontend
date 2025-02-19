import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <main className="mt-3 px-2">
      <Link to='/addproduct'>
        <button className="mb- w-32 rounded-lg bg-green-600 p-2 text-white">
          Add Product
        </button>
      </Link>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-blue-700">
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                #
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Product Image
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Product Name
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Category
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Price
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-6 py-4">2</td>
              <td className="border-b px-6 py-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product B"
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="border-b px-6 py-4">Product B</td>
              <td className="border-b px-6 py-4">Category 2</td>
              <td className="border-b px-6 py-4">$20.00</td>
              <td className="gap-2 border-b px-6 py-4 lg:flex">
                <button className="w-16 rounded-lg bg-blue-600 p-2 text-white">
                  Edit
                </button>
                <button className="w-16 rounded-lg bg-red-600 p-2 text-white">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Product;
