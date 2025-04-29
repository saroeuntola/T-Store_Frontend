import axios from "axios";



const checkTransaction = async (token,body) => {
  try {
    const response = await axios.post(
      "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export {checkTransaction};
