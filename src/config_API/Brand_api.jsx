import { baseURL } from "service/baseURL";

const getBrand = async () => {
  try {
    const response = await baseURL.get("/brand/list");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getBrandById = async (token, id) => {
  try {
    const response = await baseURL.get(`/brand/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createBrand = async (token, body) => {
  try {
    const response = await baseURL.post("/brand/create", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const updateBrand = async (token, id, body) => {
  try {
    const response = await baseURL.post(`/brand/update/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const deleteBrand = async (token, id) => {
  try {
    const response = await baseURL.delete(`/brand/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { getBrand,
    getBrandById,
    updateBrand,
    createBrand,
    deleteBrand
};
