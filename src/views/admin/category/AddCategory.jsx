import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { createCategory } from "config_API/category_api";
import { getAccessToken } from "service/Auth";
import InfoUser from "config_API/infoUser";

const AddCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const curUser = InfoUser(); // Get user info

  // ✅ Set form values when curUser is available
  useEffect(() => {
    if (curUser?.username) {
      setValue("user_display", curUser.username); // Display username
      setValue("user_id", curUser.id); // Store user ID (hidden)
    }
  }, [curUser, setValue]);

  const handleLogin = async (body) => {
    try {
      const response = await createCategory(token, body);
      if (response?.data?.category) {
        setValue("name", response.data.category.name);
        setValue("user_id", response.data.category.user_id);
        navigate("/admin/category");
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("AddCategory failed:", error);
    }
  };

  return (
    <main className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl bg-white px-6 py-16 shadow-xl shadow-gray-700 sm:w-8/12 sm:px-10 md:w-6/12 lg:w-4/12">
        <h4 className="mb-4 text-center text-3xl font-bold text-navy-700 dark:text-white sm:text-4xl">
          Add Category
        </h4>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Category Name Input */}
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              type="text"
              placeholder="Category Name"
              {...register("name", { required: "Category Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Display Username but store User ID */}
          <div className="mb-4">
            <Label htmlFor="user_display">Added By</Label>
            <TextInput
              id="user_display"
              type="text"
              placeholder="Username"
              readOnly // Show username but prevent editing
              {...register("user_display")}
            />
          </div>

          {/* Hidden Input to store User ID */}
          <input type="hidden" {...register("user_id")} />

          {/* Save Button */}
          <Button
            type="submit"
            className="linear mt-4 w-full bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddCategory;
