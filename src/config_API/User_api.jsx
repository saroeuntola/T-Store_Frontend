
const { baseURL } = require("service/baseURL");

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


const getUserById = async (id) => {
  try {
    const response = await baseURL.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createUser = async (token, body) => {
  try {
    const response = await baseURL.post("/users", body, {
      header: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const updateUser = async (token, id, body) => {
  try {
    const response = await baseURL.post(`/users/${id}`, body, {
      headers: {
    
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
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
    return response;
  } catch (error) {
    return error.response;
  }


};

const updateProfile = async (token,id,body) => {
  try {
    const response = await baseURL.post(`/users/${id}`, body, {
      header: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
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
 
};



