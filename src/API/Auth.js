import axios from "axios";

export const signUp = async (username, password, email) => {
  const Data = {
    username,
    password,
    email,
  };
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "users/signup",
      Data
    );
    window.localStorage.setItem("token", data);
    console.log(data);
  } catch (err) {
    throw new Error({ message: err.message });
  }
};

export const signIn = async (email, password) => {
  const Data = {
    email,
    password,
  };
  try {
    console.log("Attempting to login with data:", Data);
    console.log("Server URL:", process.env.REACT_APP_SERVER_URL);
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "users/signin",
      Data
    );

    console.log("Server response:", data);

    // Ensure you're storing the correct token structure
    const token = data.token || data; 
    window.localStorage.setItem("token", token);
    console.log("Token saved:", token);

  } catch (err) {
    console.log("Error details:", err.response || err);
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Non-Auth related user functions below

export const getDetails = async () => {
    try {
      const token = window.localStorage.getItem("token");
      console.log(token);
      console.log(process.env.REACT_APP_SERVER_URL)
      const headers = {
        Authorization: `Bearer ${token}`
      };
      console.log(headers)
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "profile", { headers});
      return response.data.details;
    } catch (error) {
      console.error("Error getting records:", error);
      throw error;
    }
  };

  