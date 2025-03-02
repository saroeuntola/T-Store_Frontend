import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import Home from "views/pages/Home";
import Login from "views/auth/Login";
import Register from "views/auth/Register";
import AddProduct from "views/admin/pruduct/AddProduct";
import { getAccessToken } from "service/Auth";
import AddUser from "views/admin/user/AddUser";
import EditUser from "views/admin/user/EditUser";
import { removeToken } from "service/Auth";
import Unauthorized from "service/Auth";
import Profile from "views/admin/user/Profile";
import EditCategory from "views/admin/category/EditCategory";
import AddCategory from "views/admin/category/AddCategory";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return exp < currentTime; 
  } catch (error) {
    console.error("Invalid token", error);
    return true; 
  }
};

const App = () => {
  const [token, setToken] = useState(getAccessToken());
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      removeToken();
      setToken(null); 
    }
  }, [token]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile/>} />
      {/* Private Routes */}
      {token ? (
        <>
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="rtl/*" element={<RtlLayout />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory/:id" element={<EditCategory />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />

      )}
      {/* Unauthorized */}
      <Route
        path="/unauthorized" element={<Unauthorized/>}
      />
    </Routes>
  );
};

export default App;
