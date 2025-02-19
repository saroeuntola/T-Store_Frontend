
export const setToken = (body) => {
  localStorage.setItem("token", body);
  return true;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken;
};

export const removeToken = () => {
  localStorage.removeItem("token");
  return true;
};

