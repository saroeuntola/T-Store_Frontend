import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { urlProductImage } from "service/baseURL";
import { getBanner } from "config_API/Banner_api";
import { urlBannerImage } from "service/baseURL";
import { Link } from "react-router-dom";
import { getProductLimit } from "config_API/Product_api";
import { CartContext } from "./Context/CartProvider";
import Swal from "sweetalert2";
import { SearchContext } from "./Context/SearchContext";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerLoading, setBannerLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchProductsAndBanners = async () => {
      try {
        const [response, resBanner] = await Promise.all([
          getProductLimit(),
          getBanner(),
        ]);

        setProducts(response.product || []);
        setBanners(resBanner.banner || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setBannerLoading(false);
      }
    };

    fetchProductsAndBanners();
  }, []);

  const searchProduct = products.filter((item) => {
    const search = searchQuery.toLowerCase();
    return (
      String(item.id).toLowerCase().includes(search) ||
      String(item.name).toLowerCase().includes(search) ||
      String(item.description).toLowerCase().includes(search) ||
      String(item.category).toLowerCase().includes(search) ||
      String(item.price).toLowerCase().includes(search)
    );
  });

  return (
    <div className="bg-gray-50 py-10">
      {/* Hero Section with Slideshow (DYNAMIC) */}
      <div className="relative w-full" style={{ height: "512px" }}>
        {bannerLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
            <ClipLoader color="#0000FF" size={50} />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            className="h-full w-full"
          >
            {banners.length > 0 ? (
              banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <div className="flex h-full w-full flex-col items-center justify-between py-6 md:flex-row">
                    <img
                      src={
                        banner.banner_image
                          ? `${urlBannerImage}${banner.banner_image}`
                          : "https://via.placeholder.com/820x312"
                      }
                      alt={banner.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="flex h-[50vh] w-full items-center justify-center bg-gray-300">
                  <p className="text-xl font-semibold text-gray-700">
                    No Banners Available
                  </p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        )}
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
          <div className="text-center text-gray-500">
            <ClipLoader color="#0000FF" size={50}/>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {searchProduct.length === 0 ? (
              <p className="text-lg text-gray-900">No products found</p>
            ) : (
              searchProduct.map((product) => (
                <div
                  key={product.id}
                  className="relative overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={
                        product.image
                          ? `${urlProductImage}${product.image}`
                          : "https://via.placeholder.com/400x300"
                      }
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />
                  </Link>

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

                    <button
                      className="mt-4 w-full rounded-2xl bg-blue-500 px-5 py-2 text-white shadow-md transition hover:bg-yellow-500"
                      onClick={() => {
                        addToCart(product);
                        Swal.fire({
                          icon: "success",
                          title: "Added to Cart!",
                          text: `"${product.name}" has been added to your cart.`,
                          showConfirmButton: false,
                          timer: 2500,
                          toast: true,
                          position: "center",
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
