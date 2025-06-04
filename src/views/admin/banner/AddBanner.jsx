import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBanner } from "config_API/Banner_api";
import InfoUser from "config_API/infoUser";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";

const AddBanner = () => {

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
      setValue("username", currentUser.username); 
      setValue("user_id", currentUser.id);
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
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("user_id", data.user_id);

    if (image) {
      formData.append("banner_image", image);
    }

    try {
      const response = await createBanner(token, formData);
      if (response.banner) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Banner Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/banner");
      }
    } catch (err) {
      console.error("Error adding banner:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-xl transition-all mt-10">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Add Banner
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            placeholder="Enter banner title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            placeholder="Enter a brief description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Link */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="text"
            {...register("link")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            placeholder="Optional: https://example.com"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Banner Preview"
              className="mt-4 w-full rounded-lg border object-cover shadow-md"
              style={{ height: "160px" }}
            />
          )}
        </div>

        {/* Hidden User ID */}
        <input type="hidden" {...register("user_id")} />

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Add Banner
        </button>
      </form>
    </div>
  );
};
export default AddBanner;
