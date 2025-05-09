import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";
import { urlBrandImage } from "service/baseURL";
import { getBrandById } from "config_API/Brand_api";
import { updateBrand } from "config_API/Brand_api";

const EditBrand = () => {
  const { id } = useParams(); // Get banner ID from URL
  const token = getAccessToken();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getBrandById(token,id);
        if (response) {
          const brand = response.brand;
          setValue("brand_name", brand.brand_name);
          setValue("user_id", brand.user_id);

           setImagePreview(
             brand.brand_image ? `${urlBrandImage}${brand.brand_image}` : null
           );
        }
      } catch (error) {
        console.error("Error fetching brand:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [id, token, setValue]);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  const onSubmit = async (data) => {
   const formData = new FormData();
   formData.append("brand_name", data.brand_name);
   formData.append("user_id", data.user_id);
   if (selectedImage) {
     formData.append("brand_image", selectedImage);
   }
    try {
      const response = await updateBrand(token,id, formData);
      if (response?.brand) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Brand Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/brand");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="mx-auto mt-28 max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Update Brand
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
          Update Brand
        </button>
      </form>
    </div>
  );
};

export default EditBrand;
