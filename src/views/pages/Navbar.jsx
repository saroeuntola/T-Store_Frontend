import { getMyInfo } from "config_API/Auth_api";
import { removeToken, getAccessToken } from "service/Auth";
import { urlUserImage } from "service/baseURL";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { CartContext } from "./Context/CartProvider";

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
          console.error("Error fetching user info:", error);
          setIsLoggedIn(false);
        }
      }
    };
    fetchMyInfo();
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser({});
    navigate("/");
  };

  return (
    <nav className="fixed z-50 w-full bg-yellow-300 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
          TStore<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden space-x-6 text-sm font-medium uppercase text-gray-700 md:flex">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/services" className="hover:text-blue-500">
            Services
          </Link>
          <Link to="/products" className="hover:text-blue-500">
            Products
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-60 rounded-lg border px-3 py-2 text-sm focus:outline-none"
            />
            <HiSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart sixe={30} className="cursor-pointer text-lg text-gray-700" />
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
                    className="h-10 w-10 rounded-full border"
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
            <Link to="/login" className="text-sm font-medium text-blue-600">
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
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/services" className="hover:text-blue-500">
            Services
          </Link>
          <Link to="/products" className="hover:text-blue-500">
            Products
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
