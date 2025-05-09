
import { getBrand } from 'config_API/Brand_api';
import { deleteBrand } from 'config_API/Brand_api';
import React, { useEffect, useState } from 'react'
import { Link,} from 'react-router-dom';
import { getAccessToken } from 'service/Auth'
import { urlBrandImage } from 'service/baseURL';
import Swal from 'sweetalert2';

const Brand = () => {
  const [brand, setBrand] = useState([]);
  const token = getAccessToken();  
  useEffect(() => {
    const list = async () => {
      const response = await getBrand();
      setBrand(response?.brand);
      console.log(response?.brand);
    };

    list();
  }, []);

  const handleDelete = async (id) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await deleteBrand(token, id);
            setBrand((prevBanners) =>
              prevBanners.filter((item) => item.id !== id)
            );

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    } catch (error) {
        console.error("Error deleting:", error);
    }
};
  return (
    <main className="mt-3 px-2">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <Link to="/add_brand">
          <button className="mb-4 w-32 rounded-lg bg-green-600 p-2 text-white">
            Add Brand
          </button>
        </Link>
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-yellow-600">
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                ID
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Brand Name
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Create Date
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Added By
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brand?.map((item) => (
              <tr key={item.id}>
                <td className="border-b px-6 py-4">{item.id}</td>
                <td className="flex items-center gap-3 border-b px-6 py-4">
                  <img
                    src={`${urlBrandImage}${item.brand_image}`}
                    alt={item.brand_name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  {item.brand_name}
                </td>
    
                <td className="border-b px-6 py-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="border-b px-6 py-4">{item.get_user.username}</td>
                <td className="border-b px-6 py-4">
                  <Link to={`/edit_brand/${item.id}`}>
                    <button className="w-16 rounded-lg bg-blue-600 p-2 text-white">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="ml-2 w-16 rounded-lg bg-red-600 p-2 text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Brand