import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Context/CartProvider";
import Swal from "sweetalert2";
import { urlProductImage } from "service/baseURL";
import { SearchContext } from "./Context/SearchContext";
import { Link } from "react-router-dom";
import { getProduct } from "config_API/Product_api";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners"; // Import the spinner component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { searchQuery } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        setProducts(response.product || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(0); // Reset page when filter/search changes
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.get_category?.name)),
  ];

  const priceRanges = ["All", "Low", "Medium", "High"];

  // Apply filters
  const categoryFiltered =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.get_category?.name === selectedCategory
        );

  const priceFiltered = categoryFiltered.filter((product) => {
    const price = parseFloat(product.price);
    if (selectedPriceRange === "Low") return price < 50;
    if (selectedPriceRange === "Medium") return price >= 50 && price <= 150;
    if (selectedPriceRange === "High") return price > 150;
    return true;
  });

  const finalFilteredProducts = priceFiltered.filter((item) => {
    const search = searchQuery.toLowerCase();
    return (
      String(item.id).toLowerCase().includes(search) ||
      String(item.name).toLowerCase().includes(search) ||
      String(item.description).toLowerCase().includes(search) ||
      String(item.get_category?.name).toLowerCase().includes(search) ||
      String(item.price).toLowerCase().includes(search)
    );
  });

  // Pagination logic
  const offset = currentPage * productsPerPage;
  const currentProducts = finalFilteredProducts.slice(
    offset,
    offset + productsPerPage
  );
  const pageCount = Math.ceil(finalFilteredProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="mt-6 px-6 py-10 md:px-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Shop</h2>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div>
            <label
              htmlFor="priceFilter"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Filter by Price Range
            </label>
            <select
              id="priceFilter"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-52 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center">
            <ClipLoader color="#0000FF" size={50} />
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {currentProducts.map((product) => (
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
              ))}
            </div>

            {/* React Paginate */}
            {pageCount > 1 && (
              <div className="mt-10 flex justify-center">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next →"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={pageCount}
                  previousLabel="← Prev"
                  containerClassName="flex items-center gap-2 text-sm"
                  pageClassName=""
                  pageLinkClassName="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                  previousLinkClassName="px-3 py-1 rounded bg-gray-300 hover:bg-blue-500 hover:text-white"
                  nextLinkClassName="px-3 py-1 rounded bg-gray-300 hover:bg-blue-500 hover:text-white"
                  activeLinkClassName="bg-blue-600 text-white"
                  disabledLinkClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
