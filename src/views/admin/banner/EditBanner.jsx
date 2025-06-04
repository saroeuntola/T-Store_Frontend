import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getBannerById, updateBanner } from "config_API/Banner_api";
import { getAccessToken } from "service/Auth";
import { urlBannerImage } from "service/baseURL";
import Swal from "sweetalert2";

const EditBanner = () => {
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
    const fetchBanner = async () => {
      try {
        const response = await getBannerById(token,id);
        if (response) {
          const banner = response.banner;
          setValue("title", banner.title);
          setValue("description", banner.description);
          setValue("link", banner.link);
          setValue("user_id", banner.user_id);

           setImagePreview(
             banner.banner_image ? `${urlBannerImage}${banner.banner_image}` : null
           );
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
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
   formData.append("title", data.title);
   formData.append("description", data.description);
   formData.append("link", data.link);
   formData.append("user_id", data.user_id);
   if (selectedImage) {
     formData.append("banner_image", selectedImage);
   }
    try {
      const response = await updateBanner(token,id, formData);
      if (response?.banner) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Banner Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/banner");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-10 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800"> Edit Banner</h2>

        {/* Title Input */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Link Input */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Link
          </label>
          <input
            {...register("link", { required: "Link is required" })}
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {errors.link && (
            <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>
          )}
        </div>

        {/* Hidden user ID */}
        <input type="hidden" {...register("user_id", { required: true })} />

        {/* Image Upload */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-64 rounded-lg object-cover shadow-md"
              style={{ height: "128px" }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          {loading ? "Updating..." : "Update Banner"}
        </button>
      </form>
    </main>
  );
};

export default EditBanner;
