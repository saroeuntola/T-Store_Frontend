import { getMyInfo } from "config_API/Auth_api";
import { removeToken, getAccessToken } from "service/Auth";
import { urlUserImage } from "service/baseURL";
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { CartContext } from "./Context/CartProvider";
import { SearchContext } from "./Context/SearchContext";
import brand from "./images/brand.png"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = getAccessToken();
    const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchMyInfo = async () => {
      if (token) {
        try {
          const response = await getMyInfo(token);
          setUser(response?.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Unauthorized:", error);
          removeToken();
          setUser({});
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false); // No token? Not logged in.
      }
    };
    fetchMyInfo();
  }, [token]);

    const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser({});
    navigate("/");
  };

  return (
    <nav className="fixed z-50 w-full bg-yellow-400 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-20">
        <Link
          to="/"
          className="flex flex-1 items-center space-x-2 text-2xl font-semibold"
        >
          <img
            src={brand}
            alt="TStore Logo"
            className="h-10 w-10 rounded-full"
          />
          <span>
            TStore<span className="text-blue-500">.</span>
          </span>
        </Link>
        {/* Desktop Menu */}
        <ul className="text-gray hidden space-x-6 text-sm font-medium uppercase md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="ms-6 flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              onChange={handleSearch}
              type="text"
              value={searchQuery}
              placeholder="Search..."
              className="w-60 rounded-2xl border-none px-3 py-2 text-sm"
            />
            <HiSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="cursor-pointer text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                {user.profile ? (
                  <img
                    className="h-9 w-9 rounded-full"
                    src={`${urlUserImage}${user.profile}`}
                    alt="profile"
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-700" />
                )}
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-md">
                  <p className="px-4 py-2 font-semibold">{user.username}</p>
                  <Link
                    to={`/profile/${user.id}`}
                    className="block px-4 py-2 text-blue-500"
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full px-4 py-2 text-left text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md border border-blue-600 px-4 py-1.5 text-sm font-semibold text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="absolute left-0 top-full flex w-full flex-col items-center space-y-4 bg-white py-4 text-sm font-medium uppercase text-gray-700 shadow-md md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `border-b-2 pb-1 hover:text-blue-500 ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-700"
                  : "border-transparent"
              }`
            }
          >
            Contact
          </NavLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
