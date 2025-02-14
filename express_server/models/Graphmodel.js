/*
11/26/2023 : Major change (split by months)
03/29/2024 : Major change (Reworking entire Domain system)
*/


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/seizureApp.db');

function getGraphSeizures(req,res){

let start_date = req.query.start_date
let end_date = req.query.end_date
  
let query="select * from seizureRecord where uid=? order by TimeOfSz"
  db.all(query,[req.uid],(err,rows)=>{
if(err){
  console.log(err)
}
 
  let result=queryByDate(rows,start_date,end_date)
  
  res.send({result})

  
})  
}


function queryByDate(rows,start_date,end_date){
  
  let result=[]
  
  for(let row of rows){ ///all the dates , dates [start,start+domain]
    
    let TimeOfSz=row.TimeOfSz
   
    if(IsRecordInDomain(TimeOfSz,start_date,end_date)){ 
      
        result.push(row);
      
    }
    
  }
  return result
}

function IsRecordInDomain(TimeOfSz, start_date, end_date) {
  let szDate = TimeOfSz.split(' ')[0]; // Extract the date part from TimeOfSz

  return szDate >= start_date && szDate <= end_date;
}

function getFirstSeizure(req, res) {
  let query = "select * from seizureRecord order by TimeOfSz asc limit 1";
  db.get(query, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(row);
  });
}

function getLastSeizure(req, res) {
  let query = "select * from seizureRecord order by TimeOfSz desc limit 1";
  db.get(query, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(row);
  });
}

module.exports={
  getGraphSeizures,
  getFirstSeizure,
  getLastSeizure,
}