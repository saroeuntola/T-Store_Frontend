import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getProduct } from "config_API/Product_api";
import { urlProductImage } from "service/baseURL";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        setProducts(response.product);
        console.log(response.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Slideshow (STATIC) */}
      <div className="relative h-[60vh] w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          className="h-full w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex h-[50vh] w-full flex-col items-center justify-between bg-gray-200 p-6 md:flex-row">
              <div className="max-w-lg text-center md:text-left">
                <h1 className="text-4xl font-semibold text-gray-800 md:text-5xl">
                  YOUR PRODUCTS <br /> ARE GREAT.
                </h1>
                <button className="mt-6 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-600">
                  SHOP PRODUCT
                </button>
              </div>
              <img
                src="https://via.placeholder.com/400x300"
                alt="Product 1"
                className="w-80 rounded-lg object-cover shadow-lg md:w-96"
              />
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex h-[50vh] w-full flex-col items-center justify-between bg-gray-300 p-6 md:flex-row">
              <div className="max-w-lg text-center md:text-left">
                <h1 className="text-4xl font-semibold text-gray-800 md:text-5xl">
                  NEW COLLECTION <br /> JUST ARRIVED!
                </h1>
                <button className="mt-6 rounded-lg bg-green-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-green-600">
                  EXPLORE NOW
                </button>
              </div>
              <img
                src="https://via.placeholder.com/400x300"
                alt="Product 2"
                className="w-80 rounded-lg object-cover shadow-lg md:w-96"
              />
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex h-[50vh] w-full flex-col items-center justify-between bg-gray-400 p-6 md:flex-row">
              <div className="max-w-lg text-center md:text-left">
                <h1 className="text-4xl font-semibold text-gray-800 md:text-5xl">
                  EXCLUSIVE DEALS <br /> FOR YOU!
                </h1>
                <button className="mt-6 rounded-lg bg-red-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-red-600">
                  CHECK OFFERS
                </button>
              </div>
              <img
                src="https://via.placeholder.com/400x300"
                alt="Product 3"
                className="w-80 rounded-lg object-cover shadow-lg md:w-96"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-2 gap-6 px-6 py-8 text-center text-gray-700 md:grid-cols-4 md:px-16">
        <div>
          <p className="font-semibold">🚚 FREE DELIVERY</p>
          <p className="text-sm text-gray-500">Get your order fast & free.</p>
        </div>
        <div>
          <p className="font-semibold">✅ QUALITY GUARANTEE</p>
          <p className="text-sm text-gray-500">Top-notch products.</p>
        </div>
        <div>
          <p className="font-semibold">🔥 DAILY OFFERS</p>
          <p className="text-sm text-gray-500">Exciting discounts daily.</p>
        </div>
        <div>
          <p className="font-semibold">🔒 100% SECURE PAYMENT</p>
          <p className="text-sm text-gray-500">Safe transactions guaranteed.</p>
        </div>
      </div>

      {/* Product Grid Section (DYNAMIC) */}
      <div className="px-6 py-10 md:px-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Featured Products
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
              >
                <img
                  src={
                    product.image
                      ? `${urlProductImage}${product.image}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
                <div className="rounded-lg bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        product.status === "Instock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-5 py-2 text-sm font-medium text-black shadow-md transition hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
