import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import Home from "views/pages/Home";
import Login from "views/auth/Login";
import Register from "views/auth/Register";
import AddProduct from "views/admin/pruduct/AddProduct";
import AddUser from "views/admin/user/AddUser";
import EditUser from "views/admin/user/EditUser";

import Profile from "views/admin/user/Profile";
import EditCategory from "views/admin/category/EditCategory";
import AddCategory from "views/admin/category/AddCategory";
import AddSizes from "views/admin/sizes/AddSizes";
import EditSizes from "views/admin/sizes/EditSizes";
import AddColor from "views/admin/colors/AddColor";
import EditColor from "views/admin/colors/EditColor";

import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "service/Auth";
import Navbar from "views/pages/Navbar";
import Footer from "views/pages/Footer";
import NotFound from "views/auth/NotFound";


const App = () => {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/rtl") ||
    location.pathname.startsWith("/add") || // Covers addproduct, adduser, addcategory, etc.
    location.pathname.startsWith("/edit") || // Covers edituser, editcategory, etc.
    location.pathname === "/login" ||
    location.pathname === "/unauthorized" ||
    location.pathname === "/404" ||
    location.pathname.startsWith("/profile");

  return (
    <main>
      {/* Conditionally render Navbar and Footer */}
      {!isDashboardRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Private Routes */}
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager", "user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rtl/*"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <RtlLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edituser/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcategory"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editcategory/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <EditCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add_sizes"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AddSizes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_sizes/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <EditSizes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add_colors"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <AddColor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_colors/:id"
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <EditColor />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all Route for 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isDashboardRoute && <Footer />}
    </main>
  );
};

export default App;
