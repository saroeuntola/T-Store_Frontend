import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getBanner, createBanner } from "config_API/Banner_api";
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Preview new image
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
      if (response) {
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
    <div className="mx-auto max-w-2xl rounded-md bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Add New Banner</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full rounded border p-2"
            type="text"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded border p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Link</label>
          <input
            {...register("link")}
            className="w-full rounded border p-2"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium">Banner Image</label>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Banner Preview"
              className="mt-2 h-32 w-full object-cover"
            />
          )}
        </div>

        <input type="hidden" {...register("user_id")} value={currentUser?.id} />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Add Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
