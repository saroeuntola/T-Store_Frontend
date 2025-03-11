import { deleteBanner } from 'config_API/Banner_api';
import { getBanner } from 'config_API/Banner_api';
import React, { useEffect, useState } from 'react'
import { Link,} from 'react-router-dom';
import { getAccessToken } from 'service/Auth'
import { urlBannerImage } from 'service/baseURL';
import Swal from 'sweetalert2';

const Banner = () => {
  const [banner, setbanner] = useState([]);
  const token = getAccessToken();  
  useEffect(() => {
    const list = async () => {
      const response = await getBanner();
      setbanner(response?.banner);
      console.log(response?.banner);
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
            await deleteBanner(token, id);
            setbanner((prevBanners) =>
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
        <Link to="/add_banner">
          <button className="mb-4 w-32 rounded-lg bg-green-600 p-2 text-white">
            Add Banner
          </button>
        </Link>
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-yellow-600">
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                ID
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Title
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Description
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Link
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
            {banner?.map((item) => (
              <tr key={item.id}>
                <td className="border-b px-6 py-4">{item.id}</td>
                <td className="flex items-center gap-3 border-b px-6 py-4">
                  <img
                    src={`${urlBannerImage}${item.banner_image}`}
                    alt={item.title}
                    className="h-12 w-12 rounded object-cover"
                  />
                  {item.title}
                </td>
                <td className="border-b px-6 py-4">{item.description}</td>
                <td className="border-b px-6 py-4">{item.link}</td>
                <td className="border-b px-6 py-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="border-b px-6 py-4">{item.get_user.username}</td>
                <td className="border-b px-6 py-4">
                  <Link to={`/edit_banner/${item.id}`}>
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

export default Banner