import { getRole } from 'config_API/roles_api';
import React, { useEffect, useState } from 'react'
import { getAccessToken } from 'service/Auth';


const Role = () => {
  const [roles ,setRoles] = useState([]);
const token = getAccessToken();
  const fetchRoles = async () => {
   try{
     const response = await getRole(token);
     setRoles(response?.data);
     console.log(response?.data);
   }
   catch(error){
     console.log(error);
   }
  
  
  }
  
  useEffect(() => {
    fetchRoles();
  }, []);
 
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
                ID
              </th>

              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Role Name
              </th>
              <th className="border-b px-6 py-3 text-left font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              roles?.map((role) => (
                <tr key={role.id}>
                  <td className="border-b px-6 py-4">{role.id}</td>
                  <td className="border-b px-6 py-4">{role.name}</td>
                  <td className="border-b px-6 py-4">
                    <button className="w-16 rounded-lg bg-blue-600 p-2 text-white">
                      Edit
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

export default Role