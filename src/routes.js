import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
// import RTLDefault from "views/rtl/default";
import Product from "views/admin/pruduct/product";
import Category from "views/admin/category/Category";
import Sizes from "views/admin/sizes/Sizes";
import { MdColorLens } from "react-icons/md";
// Auth Imports
// import Register from "views/auth/Register";
// import Login from "views/auth/Login";
import User from "views/admin/user/User";
import Role from "views/admin/role/Role";
import Order from "views/admin/order/Order";
import Transaction from "views/admin/transaction/Transaction";
import Color from "views/admin/colors/Color";
import { FaAward, FaDumpster, FaHome, FaShoppingCart, FaStickyNote, FaTags, FaTshirt, FaUser } from "react-icons/fa";
import {FaPanorama } from "react-icons/fa6"

import Banner from "views/admin/banner/Banner";
import Brand from "views/admin/brand/Brand";
import { ImFontSize } from "react-icons/im";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <FaHome size={23} />,
    component: <MainDashboard />,
  },
  {
    name: "User",
    layout: "/admin",
    path: "users",
    icon: <FaUser size={23} />,
    component: <User />,
  },
  {
    name: "Role",
    layout: "/admin",
    icon: <FaAward size={23} />,
    path: "role",
    component: <Role />,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "product",
    icon: <FaTshirt size={23} />,
    component: <Product />,
    secondary: true,
  },
  {
    name: "Category",
    layout: "/admin",
    path: "category",
    icon: <FaTags size={23} />,
    component: <Category />,
    secondary: true,
  },
  {
    name: "Product Sizes",
    layout: "/admin",
    path: "sizes",
    icon: <ImFontSize size={23} />,
    component: <Sizes />,
    secondary: true,
  },
  {
    name: "Product Colors",
    layout: "/admin",
    path: "colors",
    icon: <MdColorLens size={23} />,
    component: <Color />,
    secondary: true,
  },
  {
    name: "Banner",
    layout: "/admin",
    icon: <FaPanorama size={23} />,
    path: "banner",
    component: <Banner />,
  },
  {
    name: "Brand",
    layout: "/admin",
    icon: <FaDumpster size={23} />,
    path: "brand",
    component: <Brand />,
  },
  {
    name: "Order",
    layout: "/admin",
    icon: <FaShoppingCart size={23} />,
    path: "order",
    component: <Order />,
  },
  {
    name: "Transaction",
    layout: "/admin",
    icon: <FaStickyNote size={23} />,
    path: "transaction",
    component: <Transaction />,
  },

  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "login",
  //   icon: <FaLock size={23} />,
  //   component: <Login />,
  // },
  // {
  //   name: "Register",
  //   layout: "/auth",
  //   path: "register",
  //   icon: <FaLock size={23} />,
  //   component: <Register />,
  // },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
