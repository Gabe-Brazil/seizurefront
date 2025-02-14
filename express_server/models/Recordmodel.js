const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/seizureApp.db');



function addRecord(req,res){
  const {TimeOfSz,TypeOfSz,LengthOfSz, FeaturesOfSz, fromPanic }=req.body

  
  let query="insert into seizureRecord (TimeOfSz, TypeOfSz,LengthOfSz,FeaturesOfSz, uid, fromPanic) values (?,?,?,?,?,?)"
    
  db.run(query,[TimeOfSz,TypeOfSz,LengthOfSz,FeaturesOfSz,req.uid, fromPanic],(err)=>{
if(err){
  console.log(err)
  return res.json(err)
}
      res.send("Added succefully")
  })
  
  
}

function getRecords(req,res){ //currently unused
  let query=`select * from seizureRecord`
  db.all(query,(err,rows)=>{
if(err){
  console.log(err)
}
  
      res.send({rows})
  })
  
}

let tables={
 1:"TimeOfSz",
 2:"TypeOfSz",
 3:"LengthOfSz", /* Rebuild table*/
 4:"FeaturesOfSz",
 5:"created_at",
 6:"created_at"
}

function getRecordsOfUser(req,res){ // main get function
   let order=1 ///default
   let dir="ASC"

   let limit=10
   let offset=0
    if(req.query.order){
      order=req.query.order
    }
    if(req.query.dir){
      dir=req.query.dir
    }
    if(req.query.limit && req.query.limit<20){
      limit=req.query.limit
    }
    if(req.query.offset){
      offset=req.query.offset 
    }
  
  let query=`select * from seizureRecord where uid=${req.uid} order by ${tables[order]} ${dir} LIMIT ${limit} OFFSET ${offset}` 
  db.all(query,(err,rows)=>{
if(err){
  console.log(err)
}
      const newRows = rows.map(row => {
        const { uid, ...rest } = row;
        return rest;
      });
      res.send({newRows})
  })
  
}

function getSingleRecord(req,res){

  let id=req.params.id
 
  
  let query=`select * from seizureRecord where uid=${req.uid} and id='${id}'`
  db.all(query,(err,rows)=>{
if(err){
  console.log(err)
}
    if(!rows || rows.length==0){
      res.send("No record with this id")
    }else{
      res.send({rows})
    }
  })
  
}

function deleteRecordsOfUser(req,res){
/*DELETE FROM table_name WHERE condition; */

let id=req.params.id
let query=`delete from seizureRecord where Id='${id}' and uid=${req.uid}`
  db.run(query,(err)=>{
    if(err) console.log(err)
    res.end()
  })
  
}

function updateRecordsOfUser(req,res){
/*UPDATE FROM table_name WHERE condition; */
    console.log(req.body)
     const {TimeOfSz,TypeOfSz,LengthOfSz, FeaturesOfSz }=req.body
     let id = req.params.id;
     let updates=[];
     if(TimeOfSz){
         updates.push(` TimeOfSz='${TimeOfSz}' `)
     }
     if(TypeOfSz){
         updates.push(` TypeOfSz='${TypeOfSz}' `)
     }
    if(LengthOfSz){
         updates.push(` LengthOfSz ='${LengthOfSz}'`)
   }
    if( FeaturesOfSz){
        updates.push(`FeaturesOfSz='${FeaturesOfSz}'`)
      }

  if(updates.length==0){
    return res.send("No update made")
  }
  
  let query = `UPDATE seizureRecord SET ${updates.join(",")} WHERE Id='${id}' AND uid=${req.uid}`;
  console.log(query)
  db.run(query,(err)=>{
    if(err) console.log(err)
    res.end()
  })
  
}









function createSeeds(req,res){
  let num = req.query.num?req.query.num:Math.min(req.query.num,1000)
  let startYear = req.query.startYear?req.query.startYear:2015
  let startMonth = req.query.startMonth?req.query.startMonth:1
  let startDay = req.query.startDay?req.query.startDay:1
  let endYear = req.query.endYear?req.query.endYear:2022
  let endMonth = req.query.endMonth?req.query.endMonth:12
  let endDay = req.query.endDay?req.query.endDay:31
  
 



  db.serialize(function() {

  
    let insertStmt = db.prepare('insert into seizureRecord (TimeOfSz, TypeOfSz,LengthOfSz,FeaturesOfSz, uid) values (?,?,?,?,?)');

    for(let i = 0; i < num; i++) {
      let randomV=Math.floor(Math.random()*10)

      ///pick a random date from the range (startyear,startmonth,startday)
      ///to the (endYear,endMonth,endDay)
      let startDate = new Date(startYear, startMonth - 1, startDay);
      let endDate = new Date(endYear, endMonth - 1, endDay);
      let randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
                                
         ///formate randomDate to the format "2019-11-10 12:00:00" to insert it to the database     
                                
      const options = {  
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, // Use 24-hour format
          };

      insertStmt.run(randomDate.toLocaleDateString('en-US', options),"TypeOfSz",randomV,"empty list",req.uid);
      
    }

    insertStmt.finalize();


  });

   res.send("Added" +num+" Records succefully")

  
}

function deleteAll(req,res){

 let query=`delete from seizureRecord where uid=${req.uid}`
  db.run(query,(err)=>{
    if(err) return res.send("error")
    res.send("delete succefully")
  
})
        
 }

module.exports={
  addRecord,
  createSeeds,
  getRecords,
  deleteRecordsOfUser,
  deleteAll,
  getRecordsOfUser,
  getSingleRecord,
  updateRecordsOfUser
}