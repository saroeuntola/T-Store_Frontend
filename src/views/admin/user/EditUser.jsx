import React, { useState, useEffect, } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Label, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { createUser } from "config_API/User_api";
import { getAccessToken } from "service/Auth";
import { getRole } from "config_API/roles_api";
import { updateUser } from "config_API/User_api";
import { getUserById } from "config_API/User_api";

const EditUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const [listRoles, setListRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
   useEffect(() => {
     const fetchUserAndRoles = async () => {
       try {
         const response = await getUserById(id, token);
         if (response?.user) {
           const userData = response.user;
           setValue("username", userData.username);
           setValue("email", userData.email);
           setValue("sex", userData.sex);
           setValue("roles", userData.roles?.[0].name || "");
         }
         console.log(response.user)

         const rolesResponse = await getRole(token);
         setListRoles(rolesResponse?.data || []);
       } catch (error) {
         console.error("Error fetching user or roles:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchUserAndRoles();
   }, [id, token, setValue]);

  const onSubmit = async (body) => {
    try {
      const response = await updateUser(token,id, body);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/admin/users");
    } catch (err) {
      Swal.fire({
        title: "Oops",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <main className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="text-center text-xl font-bold text-navy-700 dark:text-white">
          Loading...
        </div>
      ) : (
        <div className="w-full max-w-4xl rounded-2xl bg-white px-6 py-12 shadow-xl shadow-gray-700">
          <h4 className="mb-6 text-center text-3xl font-bold text-gray-700 sm:text-4xl">
            Create Account
          </h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Username */}
            <div>
              <Label htmlFor="username">Username*</Label>
              <TextInput
                id="username"
                type="text"
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email*</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Select
              id="sex"
              value={watch("sex") || ""}
              onChange={(e) => setValue("sex", e.target.value)}
            >
              <option disabled>Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>

            <Select
              id="role"
              {...register("roles", { required: "Role is required" })}
              value={watch("roles")}
              onChange={(e) => setValue("roles", e.target.value)}
            >
              <option disabled>Select Sex</option>
              {listRoles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </Select>

            <div className="col-span-1 md:col-span-2">
              <Button type="submit" className="w-full bg-blue-500 text-white">
                Create
              </Button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default EditUser;
