const { baseURL } = require("service/baseURL");

const getRole = async (token) => {
  try {
    const response = await baseURL.get("/roles/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getRoleById = async (id) => {
  try {
    const response = await baseURL.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const createRole = async (token, body) => {
  try {
    const response = await baseURL.post("/roles", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const updateRole = async (token, id, body) => {
  try {
    const response = await baseURL.post(`/roles/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const deleteRole = async (token, id) => {
  try {
    const response = await baseURL.delete(`/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const updateProfile = async (token, id, body) => {
  try {
    const response = await baseURL.post(`/roles/${id}`, body, {
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
  getRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  updateProfile,
};
