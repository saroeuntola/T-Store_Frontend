import { getCategory } from "config_API/category_api";
import { getColor } from "config_API/Color_api";
import InfoUser from "config_API/infoUser";
import { createProduct } from "config_API/Product_api";
import { getSize } from "config_API/Size_api";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const [listCategory, setListCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = InfoUser();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    const list = async () => {
      try {
        const response = await getCategory(token);
        const res_sizes = await getSize(token);
        const res_colors = await getColor(token);
        setSizes(res_sizes?.size || []);
        setColors(res_colors?.color || []);
        setListCategory(response?.category);
        if (currentUser?.username) {
          setValue("username", currentUser.username);
          setValue("user_id", currentUser.id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    list();
  }, [token, currentUser, setValue]);

  const handleSizeChange = (selectedOptions) => {
    setSelectedSizes(selectedOptions);
  };

  const handleColorChange = (selectedOptions) => {
    setSelectedColors(selectedOptions);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !data.category ||
      selectedSizes.length === 0 ||
      selectedColors.length === 0
    ) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please make sure all fields are filled correctly.",
        icon: "error",
      });
      return;
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category); 
    formData.append("user_id", data.user_id);

    selectedSizes.forEach((size) => formData.append("size_id[]", size.value)); 
    selectedColors.forEach((color) =>
      formData.append("color_id[]", color.value)
    ); 

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await createProduct(token, formData);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product");
      }
    } catch (err) {
      console.error("Error in submission:", err);
      Swal.fire({
        title: "Oops",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full max-w-4xl gap-6 rounded-lg bg-white p-10 shadow-lg shadow-lg md:grid-cols-2"
      >
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-2 block text-black" value="Product Name" />
            <TextInput
              {...register("name", { required: "Product Name is required" })}
              type="text"
              placeholder="Enter your Product Name"
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 block text-black" value="Product Image" />
            <input
              {...register("image", { required: "Image is required" })}
              type="file"
              className="w-full"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
            {/* Display image preview if available */}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="h-32 w-32 rounded object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <Label
              className="mb-2 block text-black"
              value="Product Description"
            />
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="5"
              placeholder="Enter your Product Description"
              className="w-full"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label
              className="mb-2 block text-black"
              value="Product Price ($)"
            />
            <TextInput
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter your Product Price"
              className="w-full"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <Label className="mb-2 block text-black" value="Select Category" />
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full rounded-md p-2"
            >
              <option value="">Select Category</option>
              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

         
          <div>
            <Label className="mb-2 block text-black" value="Select Sizes" />
            <Select
              isMulti
              options={sizes.map((size) => ({
                value: size.id,
                label: size.size_name,
              }))}
              value={selectedSizes}
              onChange={handleSizeChange}
            />
          </div>

          <div>
            <Label className="mb-2 block text-black" value="Select Colors" />
            <Select
              isMulti
              options={colors.map((color) => ({
                value: color.id,
                label: color.color_name,
              }))}
              value={selectedColors}
              onChange={handleColorChange}
            />
          </div>

     
          <div>
            <TextInput
              {...register("username", { required: "Username is required" })}
              type="hidden"
              value={currentUser?.username || ""}
              className="w-full"
              disabled
            />
            <input
              {...register("user_id")}
              type="hidden"
              value={currentUser?.id}
            />
          </div>
        </div>

        <div className="mt-auto">
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddProduct;
