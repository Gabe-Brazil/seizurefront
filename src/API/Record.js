import axios from "axios"


export const addRecord=async(data)=>{
  try {
    
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  
      await axios.post(process.env.REACT_APP_SERVER_URL+"records/",data,{headers});

  }catch(err){
    throw new Error(err.message);
  }
} 

// '4' is the collumn number (Timestamp)
 export const getRecords = async (params={offset:0,dir:"ASC", order:1}) => {
  try {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(process.env.REACT_APP_SERVER_URL + "records", { headers,params });
    
    return response.data.newRows;
  } catch (error) {
    console.error("Error getting records:", error);
    throw error;
  }
};

export const updateRecord = async (Id,data) => {
  try {
    // Allows user to change any aspect of a row
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
      
   
    const response = await axios.put(process.env.REACT_APP_SERVER_URL + "records/"+ Id,data, { headers });
    
    return response //may need to work on the return of update and delete function, MAYBE it doesnt matter and immediate effects will be frontend only

  } catch (error) {
    console.error("Error updating records:", error);
    throw error; 
  }
};

export const deleteRecord=async(id)=>{
  // Deletes the entire Row of data
  try {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}` // CRUCIAL ADDITION
    };

    const response = await axios.delete(process.env.REACT_APP_SERVER_URL + "records/" + id, { headers });
    // console.log(response);
    return response
  } catch (error) {
    // Handle the error (log, show a notification, etc.)
    console.error("Error getting records:", error);
    throw error; // Optionally re-throw the error to propagate it
  }
}



