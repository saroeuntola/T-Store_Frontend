import { getMyInfo } from "config_API/Auth_api";
import InfoUser from "config_API/infoUser";
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, getAccessToken } from "service/Auth";
import { urlUserImage } from "service/baseURL";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = getAccessToken();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        if (token) {
          const response = await getMyInfo(token);
          setUser(response?.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsLoggedIn(false);
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



  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <nav className="fixed z-10 flex w-full items-center justify-between bg-yellow-300 px-20 py-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-semibold">
        TStore<span className="text-blue-500">.</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden space-x-6 text-sm font-medium uppercase text-gray-700 md:flex">
        <li className="text-blue-500">Home</li>
        <li>Services</li>
        <li>Products</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      {/* Icons & Mobile Menu Button */}
      <div className="flex items-center space-x-4 text-gray-700">
        <FaSearch
          className="cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        />
        <FaShoppingCart className="cursor-pointer" />

        {/* SignIn/Profile Button */}
        {!isLoggedIn ? (
          <Link to="/login">
           <button className="cursor-pointer" >
            Sign In
          </button>
          </Link>
         
        ) : (
          <div className="relative" onClick={toggleProfileDropdown}>
            {/* Profile Image */}
            {user.profile ? (
              <img
                className="h-10 w-10 cursor-pointer rounded-full"
                src={`${urlUserImage}${user.profile}`}
                alt="profile"
              />
            ) : (
              <FaUserCircle color="gray" className="h-10 w-10 rounded-full" />
            )}
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white p-2 text-sm text-gray-700 shadow-lg">
                <div className="px-4 py-2 font-semibold">{user.username}</div>
                <Link to={`profile/${user.id}`}>
                  <button className="block w-full px-4 py-2 text-left text-blue-500">
                    Settings
                  </button>
                </Link>

                <button
                  className="block w-full px-4 py-2 text-left text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="absolute left-0 top-full flex w-full flex-col items-center space-y-4 bg-white py-4 text-sm font-medium uppercase text-gray-700 shadow-md md:hidden">
          <li className="text-blue-500">Home</li>
          <li>Services</li>
          <li>Products</li>
          <li>Watches</li>
          <li>Sale</li>
          <li>Blog</li>
          <li>Pages</li>
        </ul>
      )}

      {/* Search Input */}
      {showSearch && (
        <div className="absolute right-6 top-full mt-2 bg-white p-2 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
