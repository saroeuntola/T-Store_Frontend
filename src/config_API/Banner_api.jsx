const { baseURL } = require("service/baseURL");

const getBanner = async () => {
  try {
    const response = await baseURL.get("/banner/list");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getBannerById = async (token,id) => {
  try {
    const response = await baseURL.get(`/banner/show/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createBanner = async (token, body) => {
  try {
    const response = await baseURL.post("/banner/create", body, {
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

const updateBanner = async (token, id, body) => {
  try {
    const response = await baseURL.post(`/banner/update/${id}`, body, {
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

const deleteBanner = async (token, id) => {
  try {
    const response = await baseURL.delete(`/banner/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export {
  getBanner,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
