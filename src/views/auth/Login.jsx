import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { login } from "config_API/Auth_api";
import { setToken } from "service/Auth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState([]);

  const handleLogin = async (body) => {
    try {
      const response = await login(body);
      setUser(response.data);
      setToken(response.data.user.token);
      const role = response.data?.user?.Roles || [];
     
     if (role.includes("user")) {
        navigate("/");
     } else {
         navigate("/admin/default");
     }
     
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  return (
    <main className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl bg-white px-6 py-16 shadow-xl shadow-gray-700 sm:w-8/12 sm:px-10 md:w-6/12 lg:w-4/12">
        <h4 className="mb-4 text-center text-3xl font-bold text-navy-700 dark:text-white sm:text-4xl">
          Sign In
        </h4>

        {/* Google Sign In */}
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email">Email*</Label>
            <TextInput
              id="email"
              type="email"
              placeholder="mail@simmmple.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label htmlFor="password">Password*</Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="keepLoggedIn" {...register("keepLoggedIn")} />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="linear mt-4 w-full bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to="/register"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
