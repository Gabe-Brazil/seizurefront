// make 2023 the CURRENT date
import axios from "axios"
export const getGraphData = async (params)=>{
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "graph", { headers,params });
        
        return response.data.result;
      } catch (error) {
        console.error("Error getting data:", error);
        throw error;
      }

}

