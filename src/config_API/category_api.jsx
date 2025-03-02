import { baseURL } from "service/baseURL";

const getCategory = async (token) => {
 
    try {
      const response = await baseURL.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };


const getCategoryById = async (token, id) => {
  try {
    const response = await baseURL.get(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createCategory = async (token, body) => {
  try {
    const response = await baseURL.post("/category", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const UpdateCategory = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/category/${id}`, body, {
      headers: {
    
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const deleteCategory = async (token, id) => {
  try {
    const response = await baseURL.delete(`/category/${id}`, {
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
  getCategory,
  getCategoryById,
  createCategory,
  UpdateCategory,
  deleteCategory,
};