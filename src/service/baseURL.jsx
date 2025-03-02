import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const urlProductImage = "http://127.0.0.1:8000/storage/product_image/";

export const urlUserImage = "http://127.0.0.1:8000/storage/user_image/";


