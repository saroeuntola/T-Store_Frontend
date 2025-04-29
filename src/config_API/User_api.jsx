import { baseURL } from "service/baseURL";

const getUser = async (token) => {
 
    try {
      const response = await baseURL.get("/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };


const getUserById = async (id,token) => {
  try {
    const response = await baseURL.get(`users/show/${id}`
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createUser = async (token, body) => {
  try {
    const response = await baseURL.post("/users/create", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const updateUser = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/users/update/${id}`, body, {
      headers: {
    
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const deleteUser = async (token, id) => {
  try {
    const response = await baseURL.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }


};

const updateProfile = async (token,id,body) => {
  try {
    const response = await baseURL.post(`/users/upload_profile/${id}`, body, {
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

const updateStatus = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/users/update_status/${id}`, body, {
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
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  updateStatus,
 
};



