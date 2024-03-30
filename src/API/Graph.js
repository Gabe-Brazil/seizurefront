// make 2023 the CURRENT date
import axios from "axios"
export const getGraphData = async (params)=>{
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/graph", { headers,params });
        
        return response.data.result;
      } catch (error) {
        console.error("Error getting data:", error);
        throw error;
      }

}

export const getFirstDate = async ()=>{
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/graph/first", { headers });
      
      return response.data.result;
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
}

export const getLastDate = async ()=>{
  try {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    
    const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/graph/last", { headers });
    
    return response.data.result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}