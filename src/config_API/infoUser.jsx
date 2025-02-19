import { useEffect, useState } from "react";
import { getMyInfo } from "./Auth_api";
import { getAccessToken } from "service/Auth";

const InfoUser = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
 
    const token = getAccessToken();
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo(token);
        setUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchMyInfo();
    }
  }, []);
  return users;
};

export default InfoUser;