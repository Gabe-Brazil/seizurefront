import axios from "axios"
export const getSettings = async ()=>{
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "settings", { headers });
        return response.data.rows;
      } catch (error) {
        console.error("Error getting data:", error);
        throw error;
      }

}

export const updateSettings = async (params)=>{
  
  try {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    
    const response = await axios.put(process.env.REACT_APP_SERVER_URL + "settings",params ,{ headers });
    
    return response;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }

}