import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
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
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full max-w-3xl gap-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700">Edit Banner</h2>

        {/* Title Input */}
        <div>
          <Label value="Banner Title" />
          <TextInput
            {...register("title", { required: "Title is required" })}
            type="text"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <Label value="Banner Description" />
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label value="Banner Link" />
          <TextInput
            {...register("link", { required: "Link is required" })}
            type="text"
          />
          {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        </div>
        <TextInput
          {...register("user_id", { required: "Link is required" })}
          type="hidden"
        />

        <div>
          <Label value="Banner Image" />
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 w-64 rounded-lg object-cover shadow"
            />
          )}
        </div>
        <Button type="submit" className="w-full">
          {loading ? "Updating..." : "Update Banner"}
        </Button>
      </form>
    </main>
  );
};

export default EditBanner;
