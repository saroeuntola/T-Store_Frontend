
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



const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  )
}

export default Unauthorized;
