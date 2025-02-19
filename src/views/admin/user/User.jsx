
import { getUser } from "config_API/User_api";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "service/Auth";

const User = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
  const token = getAccessToken();
  const listUser = async () => {
    try {
      const response = await getUser(token);
      setUser(response.users);
      console.log(response.users);
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

  return (
    <main className="mt-3 px-2">
      <button className="mb-4 w-32 rounded-lg bg-green-600 p-2 text-white">
        Add User
      </button>

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
              user.map((u) => (
                <tr key={u.id}>
                  <td className="border-b px-6 py-4">{u.id}</td>
                  <td className="border-b px-6 py-4">{u.username}</td>
                  <td className="border-b px-6 py-4">{u.email}</td>
                  <td className="border-b px-6 py-4">{u.status}</td>
                  <td className="border-b px-6 py-4">
                    {u.roles.map((role) => (
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
                      <button className="w-24 rounded-lg bg-blue-600 p-2 text-white">
                        Edit
                      </button>
                      <button className="w-24 rounded-lg bg-red-600 p-2 text-white">
                        Delete
                      </button>
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
