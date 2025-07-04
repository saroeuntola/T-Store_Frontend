import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { getAccessToken } from "service/Auth";
import InfoUser from "config_API/infoUser";

import Swal from "sweetalert2";
import { createColor } from "config_API/Color_api";

const AddColor = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const currentUser = InfoUser();
  useEffect(() => {
    if (currentUser?.username) {
      setValue("username", currentUser.username);
      setValue("user_id", currentUser.id);
    }
  }, [currentUser, setValue,token]);

  const handleCreate = async (body) => {
    try {
      const response = await createColor(token, body);
      if (response?.color) {
        setValue("color_name", response.color.name);
        setValue("user_id", response.color.user_id);
  
        Swal.fire({
          title: "Success!",
          text: "Size created successfully.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
          navigate("/admin/colors");
      } else {
        console.error(response);
        Swal.fire({
          title: "Error",
          text: "Failed to create size. Please try again.",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("AddCategory failed:", error);
    }
  };

  return (
    <main className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl bg-white px-6 py-16 shadow-xl shadow-gray-700 sm:w-8/12 sm:px-10 md:w-6/12 lg:w-4/12">
        <h4 className="mb-4 text-center text-3xl font-bold text-navy-700 dark:text-white sm:text-4xl">
          Add Product Sizes
        </h4>
        {/* Form */}
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="mb-4">
            <Label>Color</Label>
            <TextInput
              type="text"
              placeholder="Size Name"
              {...register("color_name", {
                required: "Category Name is required",
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label>Added By</Label>
            <TextInput
              type="text"
              placeholder="Username"
              readOnly
              {...register("username")}
            />
            <input type="hidden" {...register("user_id")}/>
          </div>

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

export default AddColor;
