import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://52.77.99.216/api",
});

export const urlProductImage = "http://52.77.99.216/storage/product_image/";

export const urlUserImage = "http://52.77.99.216/storage/user_image/";


