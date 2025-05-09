import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InfoUser from "config_API/infoUser";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";
import { createBrand } from "config_API/Brand_api";

const AddBrand = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = getAccessToken();
  const currentUser = InfoUser();
useEffect(() => {
    if (currentUser?.username) {
      setValue("username", currentUser?.username); 
      setValue("user_id", currentUser?.id);
    }
  }, [currentUser, setValue]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("brand_name", data.brand_name);
    formData.append("user_id", data.user_id);
    if (image) {
      formData.append("brand_image", image);
    }

    try {
      const response = await createBrand(token, formData);
      if (response.brand) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Brand Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/brand");
      }
      console.log(response.brand)
    } catch (err) {
      console.error("Error adding brand:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 mt-28 shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Add New Brand
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Brand Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            {...register("brand_name", { required: "Brand name is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            placeholder="Enter brand name"
          />
          {errors.brand_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.brand_name.message}
            </p>
          )}
        </div>

        {/* Brand Logo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Brand Logo
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Brand Preview"
              className="mt-3 h-20 w-20 rounded-full border object-cover shadow"
            />
          )}
        </div>

        {/* Hidden User ID */}
        <input type="hidden" {...register("user_id")} />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
};
export default AddBrand;
