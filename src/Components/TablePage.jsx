import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import { getRecords, updateRecords, deleteRecord } from '../API/Record';
const DELETEICONSRC="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
const ID_COLUMN_WIDTH=50

// TODO: Make a system to clean up table, Add an 'updating/editing feature'
function TablePage() {

const [rows,setRows]=useState([]);
const [params,setParams]=useState({
  offset:0,dir:"ASC", order:6
});

const [lastClicked,setLastClicked]=useState(null);

useEffect(()=>{
loadRecords()
console.log(params)
},[params])

const loadRecords = async () => {
    try {
      const records = await getRecords(params);
      setRows(records);
    } catch (error) {
      console.error("Error loading records:", error);
    }
}

const handleDelete = async (id) => {
  try {
    toast.promise(deleteRecord(id), {
      loading: "Deleting...",
      success: "Record deleted!",
      error: "Error deleting record",
    });

    await loadRecords();
  } catch (error) {
    console.error("Error handling delete:", error);
    // Handle any additional error handling or display a generic error message
    toast.error("An error occurred while deleting the record");
  }
};


  ///console.log(rows);
const TABLENAMES = [
"#", 
"Time of Seizure",
"Type of Seizure",
"Length of Seizure",
"Features of Seizure",
"Timestamp",
"fromPanic",

]

const nextPage =()=> {
setParams({...params,offset:params.offset+10}); 
}

const previousPage =()=> {
  setParams({...params,offset:params.offset-10}); 
}

const handleHeaderClick =(index)=> {
  console.log("last clicked",lastClicked)
if(index===lastClicked){
  setParams({...params,dir:params.dir==="ASC"?"DESC":"ASC",offset:0});  
  
}else{
  setParams({...params,order:index});  
}

setLastClicked(index);
}

 // Review the UID appearing from replit.
    return (
      <div> 
      <Table style={{border:"1px solid black",height:"100px",width:"80%",margin:"auto",marginTop:"20px"}} striped bordered hover>
        <thead>
          <tr>
            {rows && rows.length>0 && TABLENAMES.map((head,index)=>{
              if(index===0){
                return <th style={{width:ID_COLUMN_WIDTH}}>{"#"}</th>
              }
              return <th  key={head}> <button style={{borderColor:index===lastClicked?"red":"black"}} onClick={()=> {handleHeaderClick(index)}}> {head} </button></th> // change color based on direction
            })}
            {rows && rows.length>0 && <th style={{textAlign:"center"}}> Delete Row</th>}
         
          </tr>
        </thead>
        <tbody>
          {rows && rows.length>0 && rows.map((row,row_number)=>{
         return <tr>
            {row && Object.keys(row).map((columnName,col_number)=>{
              if(col_number===0){
                return <td>{row_number+1+params.offset}</td>
              }
              return <td  >{row[columnName]}</td>
            })}
            {row && <div><img alt="delete" onClick={()=>{handleDelete(row["Id"])}} src={DELETEICONSRC} style={{width:30,display:"block",margin:"auto"}}/></div>}
         </tr>
          })}
        </tbody>
      </Table>
    {/*https://www.npmjs.com/package/react-paginate ADD PAGINATION TO THE TABLE */}

      <button onClick={previousPage} > 10 back </button>
      <span style={{color: 'black'}}> {params.offset} </span>
      <button onClick={nextPage}> 10 forward </button>


      </div>
    );
  }
  
  export default TablePage;