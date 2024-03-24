// make 2023 the CURRENT date
import axios from "axios"
export const getGraphData = async (params={startdate:"2019-01-01",domain:"YEAR"})=>{
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        let start_date=params.startdate.split("-");

        params.startYear=Number(start_date[0]);

        params.startMonth=Number(start_date[1]);

        params.startDay=Number(start_date[2]);
        
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/graph", { headers,params });
        
        return response.data.result;
      } catch (error) {
        console.error("Error getting data:", error);
        throw error;
      }

}