import { getCategory } from "config_API/category_api";
import { createProduct } from "config_API/Product_api";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAccessToken } from "service/Auth";
import Swal from "sweetalert2";

// import { baseURL } from "service/baseURL";
// import { getAccessToken } from "service/Auth";
// import InfoUser from "config_API/infoUser";




const AddProduct = () => {
 const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = getAccessToken();
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getCategorys = async () => {
      try {
        const response = await getCategory(token);
          setListCategory(response?.data);
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
      finally{
          setLoading(false);
      }
    
    };
    getCategorys();
  }, [token]);
  const onSubmit = async (body) => {
      try {
        const response = await createProduct(token, body);
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Created Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate("/admin/products");
      } catch (err) {
        Swal.fire({
          title: "Oops",
          text: err.response?.data?.message || "An error occurred",
          icon: "error",
        });
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="grid w-full max-w-4xl gap-6 rounded-lg bg-blue-800 p-10 shadow-lg md:grid-cols-2">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-2 block text-white" value="Product Name" />
            <TextInput
              id="product-name"
              type="text"
              placeholder="Enter your Product Name"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label
              className="mb-2 block text-white"
              htmlFor="product-image"
              value="Product Image"
            />
            <FileInput id="product-image" className="w-full" />
          </div>
          <div>
            <Label
              className="mb-2 block text-white"
              value="Product Description"
            />
            <Textarea
              id="product-description"
              rows="5"
              placeholder="Enter your Product Description"
              className="w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4">
          <div>
            <Label
              className="mb-2 block text-white"
              value="Product Price ($)"
            />
            <TextInput
              id="product-price"
              type="number"
              placeholder="Enter your Product Price"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block text-white" value="Select Category" />
            <Select
              options={[
                { value: "Electronics", label: "Electronics" },
                { value: "Clothing", label: "Clothing" },
                { value: "Books", label: "Books" },
              ]}
              placeholder="Select Category"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="mb-2 block text-white" value="Select Size" />
            <Select
              isMulti
              options={[
                { value: "S", label: "S" },
                { value: "M", label: "M" },
                { value: "L", label: "L" },
              ]}
              placeholder="Select Size"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="mb-2 block text-white" value="Select Color" />
            <Select
              isMulti
              options={[
                { value: "Black", label: "Black" },
                { value: "Green", label: "Green" },
                { value: "White", label: "White" },
              ]}
              placeholder="Select Color"
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-auto">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};
export default AddProduct;
