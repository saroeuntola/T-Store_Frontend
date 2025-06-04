import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { createCategory } from "config_API/category_api";
import { getAccessToken } from "service/Auth";
import InfoUser from "config_API/infoUser";
import Swal from "sweetalert2";

const AddCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const curUser = InfoUser(); 
  useEffect(() => {
    if (curUser?.username) {
      setValue("username", curUser.username); 
      setValue("user_id", curUser.id);
    }
  }, [curUser, setValue]);

  const handleCreate = async (body) => {
    try {
      const response = await createCategory(token, body);
     if(response){
             Swal.fire({
               title: "Success!",
               text: "Category created successfully.",
               icon: "success",
               timer: 2000,
               timerProgressBar: true,
               showConfirmButton: false,
             });
               navigate("/admin/category");
           } else {
             console.error(response);
             Swal.fire({
               title: "Error",
               text: "Failed to create Category. Please try again.",
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
          Add Category
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit(handleCreate)}>
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

          <div className="mb-4">
            <TextInput
              id="user_display"
              type="hidden"
              placeholder="Username"
              readOnly
              {...register("username")}
            />
            <input type="hidden" {...register("user_id")} />
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

export default AddCategory;
