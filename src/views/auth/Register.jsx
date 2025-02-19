import React from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Label, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createAcc } from "config_API/Auth_api";


const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (body) => {
    try {
      const response = createAcc(body);
      if(response){
           Swal.fire({
             position: "center",
             icon: "success",
             title: "Account Created Successfully",
             showConfirmButton: false,
             timer: 1500,
           });
      }
      navigate("/login");
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
      <div className="w-full rounded-2xl bg-white px-6 py-16 shadow-xl shadow-gray-700 sm:w-8/12 sm:px-10 md:w-6/12 lg:w-4/12">
        <h4 className="mb-4 text-center text-3xl font-bold text-navy-700 dark:text-white sm:text-4xl">
          Create Account
        </h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <Label htmlFor="username">Username*</Label>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
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

          {/* Password Field */}
          <div className="mb-4">
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
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
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

          <div className="mb-4">
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
          <Button type="submit" className="mt-4 w-full bg-blue-500 text-white">
            Register
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
