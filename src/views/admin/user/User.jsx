
import { updateStatus } from "config_API/User_api";
import { getUser } from "config_API/User_api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";

const User = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
const token = getAccessToken()
  useEffect(() => {

  const listUser = async () => {
    try {
       const response = await getUser(token);
      setUser(response.user);
      console.log(response.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
     if (token) {
       listUser();
     }
  }, []);
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
        setUser((prevUser) =>
          prevUser.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                status: item.status === "Active" ? "Inactive" : "Active",
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
      <Link to="/adduser">
        <button className="mb-4 w-32 rounded-lg bg-green-600 p-2 text-white">
          Add User
        </button>
      </Link>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-yellow-600">
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                ID
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Username
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Email
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Status
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Role
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : user && user.length > 0 ? (
              user.map((item) => (
                <tr key={item.id}>
                  <td className="border-b px-6 py-4">{item.id}</td>
                  <td className="border-b px-6 py-4">{item.username}</td>
                  <td className="border-b px-6 py-4">{item.email}</td>
                  <td className="pt-2.5">
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium text-white ${
                        item.status === "Active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => handleUpdateStatus(item.id)}
                    >
                      {item.status === "Active" ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="border-b px-6 py-4">
                    {item.roles.map((role) => (
                      <span
                        key={role.id}
                        className="mr-2 rounded-full bg-blue-500 px-2 py-1 text-white"
                      >
                        {role.name}
                      </span>
                    ))}
                  </td>
                  <td className="border-b px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="w-24 rounded-lg bg-yellow-600 p-2 text-white">
                        Change Password
                      </button>
                      <Link to={`/edituser/${item.id}`}>
                        <button className="w-24 rounded-lg bg-blue-600 p-2 text-white">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default User;
