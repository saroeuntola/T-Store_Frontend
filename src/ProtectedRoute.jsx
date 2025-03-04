import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAccessToken, removeToken } from "service/Auth";
import InfoUser from "config_API/infoUser";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = getAccessToken();
  const [authorized, setAuthorized] = useState(null);
  const navigate = useNavigate();
  const user = InfoUser();

  useEffect(() => {
    if (token) {
      const isTokenExpired = checkTokenExpiration(token);
      if (isTokenExpired) {
        removeToken();
        window.location.reload();
        return <Navigate to="/login" replace />;
      }
    }
    if (user) {
      const userRoles = user?.Roles || [];
      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (hasRequiredRole) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  }, [user, requiredRoles, token, navigate]);

  const checkTokenExpiration = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      const currentTime = Date.now() / 1000; 
      return decodedToken.exp < currentTime; 
    } catch (error) {
      console.error("Error decoding token", error);
      return true; 
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (authorized === null) {
    return <div className="text-center">Loading...</div>;
  }

  if (!authorized) {
    navigate("/unauthorized");
    return null;
  }

  return children;
};

export default ProtectedRoute;
