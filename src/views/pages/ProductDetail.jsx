import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "config_API/Product_api";
import { CartContext } from "./Context/CartProvider";
import Swal from "sweetalert2";
import { urlProductImage } from "service/baseURL";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.product);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleSelection = (value, stateArray, setState) => {
    if (stateArray.includes(value)) {
      setState(stateArray.filter((item) => item !== value));
    } else {
      setState([...stateArray, value]);
    }
  };

  const handleAddToCart = () => {
    if (selectedColors.length === 0 || selectedSizes.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select Options",
        text: "Please select at least one color and size.",
      });
      return;
    }

    const productWithOptions = {
      ...product,
      selectedColors,
      selectedSizes,
    };

    addToCart(productWithOptions);
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `"${product.name}" has been added to your cart.`,
      showConfirmButton: false,
      timer: 2500,
      toast: true,
      position: "center",
    });
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (!product)
    return <div className="py-10 text-center">Product not found.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-40 bg-gray-50">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <img
          src={
            product.image
              ? `${urlProductImage}${product.image}`
              : "https://via.placeholder.com/500x400"
          }
          alt={product.name}
          className="h-[400px] w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              product.status === "Instock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.status}
          </span>
          <p className="mt-4 text-sm text-gray-500">
            Category: {product.get_category?.name || "Unknown"}
          </p>

          {/* Multi-Select Colors */}
          <div className="mt-6">
            <p className="mb-2 font-medium text-gray-700">Select Colors:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color.id}
                  onClick={() =>
                    toggleSelection(
                      color.color_name,
                      selectedColors,
                      setSelectedColors
                    )
                  }
                  className={`rounded-full border px-4 py-1 text-sm ${
                    selectedColors.includes(color.color_name)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {color.color_name}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Select Sizes */}
          <div className="mt-6">
            <p className="mb-2 font-medium text-gray-700">Select Sizes:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size.id}
                  onClick={() =>
                    toggleSelection(
                      size.size_name,
                      selectedSizes,
                      setSelectedSizes
                    )
                  }
                  className={`rounded-full border px-4 py-1 text-sm ${
                    selectedSizes.includes(size.size_name)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {size.size_name}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-8 inline-block rounded-2xl bg-blue-500 px-6 py-2 font-semibold text-white shadow-md hover:bg-yellow-500"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
