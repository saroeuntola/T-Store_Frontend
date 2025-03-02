import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Label, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createUser } from "config_API/User_api";
import { getAccessToken } from "service/Auth";
import { getRole } from "config_API/roles_api";

const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const [listRoles, setListRoles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await getRole(token);
          setListRoles(response?.data);
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
      finally{
          setLoading(false);
      }
    
    };

    getRoles();
  }, [token]);

  const onSubmit = async (body) => {
    try {
      const response = await createUser(token, body);
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

            {/* Password */}
            <div>
              <Label htmlFor="password">Password*</Label>
              <TextInput
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="password_confirmation">Confirm Password*</Label>
              <TextInput
                id="password_confirmation"
                type="password"
                placeholder="Re-enter password"
                {...register("password_confirmation", {
                  required: "Password confirmation is required",
                  validate: (value, context) =>
                    value === context.password || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Sex */}
            <div>
              <Label htmlFor="sex">Sex*</Label>
              <Select
                id="sex"
                {...register("sex", { required: "Sex is required" })}
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              {errors.sex && (
                <p className="text-sm text-red-500">{errors.sex.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role">Role*</Label>
              <Select
                id="role"
                {...register("roles", { required: "Role is required" })}
              >
                <option value="">Select Role</option>
                {listRoles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

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

export default AddUser;
