const { baseURL } = require("service/baseURL");


const getProduct = async () =>{
    try{
        const response = await baseURL.get('/products/list');
        return response.data;
    }
    catch(error){
        return error.response;
    }
}

const getProductById = async (id) =>{
    try{
        const response = await baseURL.get(`/products/show/${id}`);
        return response.data;
    }
    catch(error){
        return error.response;
    }
}

const createProduct = async (token,body) =>{
    try {
      const response = await baseURL.post("/products/create", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
}

const updateProduct = async (token, id, body) =>{
    try {
      const response = await baseURL.post(`/products/update/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
}

const deleteProduct = async (token, id) =>{
    try {
      const response = await baseURL.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
}
const updateStatus = async (token, id, body) => {
  try {
    const response = await baseURL.put(`/products/update_status/${id}`, body, {
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
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStatus,
  };


