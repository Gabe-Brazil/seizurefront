import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import { getRecords } from '../API/Record';
import {  decompileRecord} from "../utils/functions";
import UpdateRecordForm from './UpdateRecordForm';
const ID_COLUMN_WIDTH=50

// TODO: Make a system to clean up table, Add an 'updating/editing feature'
function TablePage() {

const [rows,setRows]=useState([]);
const [params,setParams]=useState({
  offset:0,dir:"ASC", order:6
});
const [lastClicked,setLastClicked]=useState(null);
const [showForm, setShowForm] = useState(false);
const [selectedRecord, setSelectedRecord] = useState([]);

useEffect(()=>{
loadRecords()

},[params])

useEffect(() => {
  document.body.addEventListener('click', handleBodyClick);
  return () => {
    document.body.removeEventListener('click', handleBodyClick);
  };
}, []);

function handleBodyClick(event) {
  if (!event.target.closest('table')) {
    setLastClicked(null); // Reset lastClicked when user clicks off the table
  }
}

const loadRecords = async () => {
    try {
      const records = await getRecords(params);
      setRows(records);
    } catch (error) {
      console.error("Error loading records:", error);
    }
}


function handleRowClick(record){
  setSelectedRecord(decompileRecord(record));
  setShowForm(true);
}



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
  if(params.offset>0){
  setParams({...params,offset:params.offset-10}); 
  }
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

 
    return (
      <div> 
        <button onClick={previousPage} > 10 back </button>
        <button onClick={nextPage}> 10 forward </button>
        {showForm && <UpdateRecordForm loadRecords={loadRecords} data = { selectedRecord} onClose={() => setShowForm(false)} />}
      <Table style={{border:"1px solid black",height:"100px",width:"80%",margin:"auto",marginTop:"20px"}} striped bordered hover>
        <thead>
          <tr>
            {rows && rows.length>0 && TABLENAMES.map((head,index)=>{
              if(index===0){
                return <th style={{width:ID_COLUMN_WIDTH}}>{"#"}</th>
              }
              return <th  key={head}> <button style={{borderColor:index===lastClicked?"red":"black"}} onClick={()=> {handleHeaderClick(index)}}> {head} </button></th> // change color based on direction
            })}
            
         
          </tr>
        </thead>
        <tbody>
          {rows && rows.length>0 && rows.map((row,row_number)=>{
         return <tr key={row_number} onClick={() => handleRowClick(row)}>
            {row && Object.keys(row).map((columnName,col_number)=>{
              if(col_number===0){
                return <td>{row_number+1+params.offset}</td>
              }
              return <td  >{row[columnName]}</td>
            })}
            
         </tr>
          })}
        </tbody>
      </Table>

      </div>
    );
  }
  
  export default TablePage;