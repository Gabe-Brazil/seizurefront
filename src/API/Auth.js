import axios from "axios";

export const signUp = async (username, password, email) => {
  const Data = {
    username,
    password,
    email,
  };
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users/signup",
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
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users/signin",
      Data
    );
    window.localStorage.setItem("token", data);
    console.log("data:", data);
  } catch (err) {
    console.log(err);
    throw new Error({ message: err.message });
  }
};

export const getDetails = async () => {
    try {
      const token = window.localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`
      };
  
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/profile", { headers});
      return response.data.details;
    } catch (error) {
      console.error("Error getting records:", error);
      throw error;
    }
  };
