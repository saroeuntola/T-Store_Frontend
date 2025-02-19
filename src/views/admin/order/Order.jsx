import React from 'react'

const Order = () => {
  return (
    <main className="mt-3 px-2">
      <button className="mb-4 w-32 rounded-lg bg-green-600 p-2 text-white">
        Add Product
      </button>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-yellow-600">
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                #
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

              <td className="border-b px-6 py-4">Product B</td>
              <td className="border-b px-6 py-4">Category 2</td>
              <td className="border-b px-6 py-4">$20.00</td>
              <td className="border-b px-6 py-4">
                <button className="w-16 rounded-lg bg-blue-600 p-2 text-white">
                  Edit
                </button>
                <button className="ml-2 w-16 rounded-lg bg-red-600 p-2 text-white">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Order