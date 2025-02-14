const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/seizureApp.db');

const globalDefaultSettings={
     defaultStartDate:"2024-01-01"
    ,defaultEndDate:"2024-12-31"
    ,showPanicButton:"true"
    ,chartType:"area"
    ,theme:"light"
    ,pinNumber:""
    ,lengthDisplay:"min"
}

const { defaultStartDate ,defaultEndDate,showPanicButton,chartType,theme,pinNumber,lengthDisplay }=globalDefaultSettings

function createSetting(uid,cb){
    let query="insert into settings (uid,defaultStartDate,defaultEndDate ,showPanicButton,chartType,theme ,pinNumber,lengthDisplay) values (?,?,?,?,?,?,?,?)"

    db.run(query,[uid,defaultStartDate ,defaultEndDate,showPanicButton,chartType,theme,pinNumber,lengthDisplay ],(err)=>{
  if(err){
   return cb(err)
    
  }
       cb(null);
    
 })
   

}
createSetting(16,()=>{}) // ADD TO SIGNUP FUNCTION
function getSetting(req, res) {
  let query = "SELECT * FROM settings WHERE uid=?";
  db.all(query, [req.uid], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ rows });
    }
  });
}

function updateSetting(req,res) {


  const { defaultStartDate, defaultEndDate, showPanicButton, chartType, theme, pinNumber, lengthDisplay, language, timeMode } = req.body;

  let new_values=[defaultStartDate, defaultEndDate, showPanicButton, chartType, theme, pinNumber, lengthDisplay, language, timeMode]
  let commands=[
                 " defaultStartDate = ?",
                 "defaultEndDate = ?",
                 "showPanicButton = ?",
                 "chartType = ?",
                 "theme = ?",
                 "pinNumber = ?",
                 "lengthDisplay = ?",
                 "language = ? "]
  commands=commands.filter((item,index)=>{
    return new_values[index]
  })
  new_values=new_values.filter(item=>item);
  let query = ` UPDATE settings  SET `+ commands.join(",")+" Where uid= ?"

const uid=req.uid
  db.run(query, [...new_values, uid], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("updated succefully")
    }
  });
}

module.exports={
  getSetting,
  createSetting,
  updateSetting
}