import { deleteProduct } from "config_API/Product_api";
import { updateStatus } from "config_API/Product_api";
import { getProduct } from "config_API/Product_api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccessToken } from "service/Auth";
import { urlProductImage } from "service/baseURL";
import Swal from "sweetalert2";

const Product = () => {

   const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
  const token = getAccessToken()
    useEffect(() => {
  
    const listProduct = async () => {
      try {
         const response = await getProduct();
        setProduct(response.product);
        console.log(response.product);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
     
         listProduct();
       
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
            await deleteProduct(token, id);
            setProduct((prevProdcuts) =>
              prevProdcuts.filter((item) => item.id !== id)
            );

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            console.log(result)
          }
        } catch (error) {
          console.error("Error deleting:", error);
        }
      };
const handleUpdateStatus = async (id, body) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to update the user's status?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        await updateStatus(token,id, body);
        setProduct((prevProdcuts) =>
          prevProdcuts.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                status: item.status === "Instock" ? "Outstock" : "Instock",
              };
            }
            return item;
          })
        );

        Swal.fire({
          title: "Updated!",
          text: "User status has been updated.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <main className="mt-3 px-2">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-3 overflow-x-auto">
          <Link to="/addproduct">
            <button className="mb-3 w-32 rounded-lg bg-green-600 p-2 text-white">
              Add Product
            </button>
          </Link>
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-blue-700">
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  ID
                </th>
           
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Name
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Category
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Size
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Color
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Price
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Status
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Create at
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Added by
                </th>
                <th className="border-b px-6 py-3 text-left font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b px-6 py-4">{item.id}</td>

                  <td className="flex items-center gap-3 border-b px-6 py-4">
                    <img
                      src={`${urlProductImage}${item.image}`}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="border-b px-6 py-4">
                    {item.get_category.name}
                  </td>
                  <td className="border-b px-6 py-4">
                    {item.sizes.map((size) => size.size_name).join(", ")}
                  </td>
                  <td className="border-b px-6 py-4">
                    {item.colors.map((color) => color.color_name).join(", ")}
                  </td>
                  <td className="border-b px-6 py-4">${item.price}</td>
                  <td className="pt-2.5">
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium text-white ${
                        item.status === "Instock"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => handleUpdateStatus(item.id)}
                    >
                      {item.status === "Instock" ? "Instock" : "Outstock"}
                    </button>
                  </td>
                  <td className="border-b px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="border-b px-6 py-4">
                    {item.get_user.username}
                  </td>
                  <td className="gap-2 border-b px-6 py-4 lg:flex">
                    <Link to={`/edit_product/${item.id}`}>
                      <button className="w-16 rounded-lg bg-blue-600 p-2 text-white">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="w-16 rounded-lg bg-red-600 p-2 text-white"
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
      )}
    </main>
  );
};

export default Product;
