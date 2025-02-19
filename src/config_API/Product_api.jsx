const { baseURL } = require("service/baseURL");


const getProduct = async () =>{
    try{
        const response = await baseURL.get('/products');
        return response.data;
    }
    catch(error){
        return error.response;
    }
}

const getProductById = async (id) =>{
    try{
        const response = await baseURL.get(`/products/${id}`);
        return response.data;
    }
    catch(error){
        return error.response;
    }
}

const createProduct = async (token,body) =>{
    try {
      const response = await baseURL.post("/products", body, {
        header: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
}

const updateProduct = async (token, id, body) =>{
    try {
      const response = await baseURL.post(`/products/${id}`, body, {
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
      const response = await baseURL.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
}

export {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };


