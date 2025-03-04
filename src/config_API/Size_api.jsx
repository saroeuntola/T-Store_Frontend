import { baseURL } from "service/baseURL";

const getSize = async (token) => {
  try {
    const response = await baseURL.get("/sizes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getSizeById = async (token, id) => {
  try {
    const response = await baseURL.get(`/sizes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createSize = async (token, body) => {
  try {
    const response = await baseURL.post("/sizes", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const UpdateSize = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/sizes/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const deleteSize = async (token, id) => {
  try {
    const response = await baseURL.delete(`/sizes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export {
  getSize,
  getSizeById,
  createSize,
  UpdateSize,
  deleteSize,
};
