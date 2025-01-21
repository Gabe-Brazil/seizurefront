import axios from "axios"
export const getMixturesWithComponents = async ()=>{
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "MixtureComponent/withcomponents", { headers });
        
        return response.data;
      } catch (error) {
        console.error("Error getting data:", error);
        throw error;
      }

}

export const addMixturesWithComponents = async (data)=>{
  try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      console.log(headers)
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "MixtureComponent/withcomponents",data, { headers });
      
      return response.data;
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }

}