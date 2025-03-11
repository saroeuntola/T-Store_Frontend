import { getCategory } from "config_API/category_api";
import { getColor } from "config_API/Color_api";
import InfoUser from "config_API/infoUser";
import { updateProduct, getProductById } from "config_API/Product_api";
import { getSize } from "config_API/Size_api";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getAccessToken } from "service/Auth";
import { urlProductImage } from "service/baseURL";
import Swal from "sweetalert2";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const token = getAccessToken();
  const currentUser = InfoUser();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [listCategory, setListCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [images, setImages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, sizeRes, colorRes, productRes] = await Promise.all([
          getCategory(token),
          getSize(token),
          getColor(token),
          getProductById(id, token),
        ]);

        setSizes(sizeRes?.size || []);
        setColors(colorRes?.color || []);
        setListCategory(categoryRes?.category || []);

        if (productRes) {
          const proData = productRes.product;
          setValue("name", proData.name);
          setValue("description", proData.description);
          setValue("price", proData.price);
          setValue("category", proData.category_id);
          setValue("user_id", proData.user_id);

          setSelectedSizes(
            proData.sizes?.map((size) => ({
              value: size.id,
              label: size.size_name,
            }))
          );
          setSelectedColors(
            proData.colors?.map((color) => ({
              value: color.id,
              label: color.color_name,
            }))
          );

          setImagePreview(
            proData.image ? `${urlProductImage}${proData.image}` : null
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token, setValue]);

  const handleSizeChange = (selectedOptions) => {
    setSelectedSizes(selectedOptions);
  };

  const handleColorChange = (selectedOptions) => {
    setSelectedColors(selectedOptions);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImages(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category);
    formData.append("user_id", data.user_id);

    selectedSizes.forEach((size) => formData.append("size_id[]", size.value));
    selectedColors.forEach((color) =>
      formData.append("color_id[]", color.value)
    );

    if (images) {
      formData.append("image", images); 
    }

    try {
      const response = await updateProduct(token, id, formData);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product");
      }
    } catch (err) {
      console.error("Error in submission:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full max-w-4xl gap-6 rounded-lg bg-white p-10 shadow-lg md:grid-cols-2"
      >
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label value="Product Name" />
            <TextInput
              {...register("name", { required: "Product Name is required" })}
              type="text"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label value="Product Image" />
            <input type="file" onChange={handleImageChange} />

            {/* Display existing image if available */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Image"
                className="mt-2 h-32 w-32 object-cover"

              />
            )}
          </div>
          <div>
            <Label value="Product Description" />
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="5"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label value="Product Price ($)" />
            <TextInput
              {...register("price", { required: "Price is required" })}
              type="number"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label value="Select Category" />
            <select
              {...register("category_id", { required: "Category is required" })}
              className="w-full rounded-md p-2"
              value={watch("category")}
              onChange={(e) => setValue("category", e.target.value)}
            >
              <option disabled>Select Category</option>
              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label value="Select Sizes" />
            <Select
              isMulti
              options={sizes.map((s) => ({ value: s.id, label: s.size_name }))}
              value={selectedSizes}
              onChange={handleSizeChange}
            />
          </div>

          <div>
            <Label value="Select Colors" />
            <Select
              isMulti
              options={colors.map((c) => ({
                value: c.id,
                label: c.color_name,
              }))}
              value={selectedColors}
              onChange={handleColorChange}
            />
          </div>

          <input
            {...register("user_id")}
            type="hidden"
            value={currentUser?.id}
          />

          <Button type="submit" className="w-full">
            Update
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditProduct;
