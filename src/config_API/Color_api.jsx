import { baseURL } from "service/baseURL";

const getColor = async (token) => {
  try {
    const response = await baseURL.get("/colors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getColorById = async (token, id) => {
  try {
    const response = await baseURL.get(`/colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createColor = async (token, body) => {
  try {
    const response = await baseURL.post("/colors", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const UpdateColor = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/colors/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const deleteColor = async (token, id) => {
  try {
    const response = await baseURL.delete(`/colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { getColor, getColorById, createColor, UpdateColor, deleteColor };
