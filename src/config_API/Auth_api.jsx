import { baseURL } from "service/baseURL";



const createAcc = async (body) => {
  try {
    const response = await baseURL.post("/register",body);
    return response;
  } catch (error) {
    return error.response;
  }
};

const login = async (body) => {
  try {
    const response = await baseURL.post("/login", body);
    return response;
  } catch (error) {
    return error.response;
  }
};

const getMyInfo = async (token) => {
  try {
    const response = await baseURL.get("/me",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
const getCount = async (token) => {
  try {
    const response = await baseURL.get("/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export {createAcc, login,getMyInfo,getCount};
