const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/seizureApp.db');

function addMixtureComponent(req,res){
const {MixtureId,MedicationName, Dose}=req.body

let query="insert into MixtureComponent (MixtureId, MedicationName, Dose) values (?,?,?)"

  db.run(query,[MixtureId,MedicationName, Dose],(err)=>{
if(err){
  console.log(err)
  return res.json(err)
}
      res.send("MixtureComponent Added succefully")
  })


}

function getMixtureComponent(req,res){ // ALL USERS DATA
  let query=`select * from MixtureComponent`
  db.all(query,(err,rows)=>{
if(err){
  console.log(err)
}

      res.send({rows})
  })

}

function getMixtureComponentsForUser(req, res){
  let query = `SELECT * FROM MixtureComponent 
               WHERE MixtureId IN (SELECT id FROM Mixture WHERE uid = ${req.uid})`;
  db.all(query, (err, rows) => {
    if(err){
      console.log(err);
      res.json(err);
    } else {
      res.json({ mixtureComponents: rows });
    }
  });
}
// IMPORTANT FUNCTIONS BELOW
//give me the portions of mixtures within (s,e)
function getMixturesWithComponentsForUser(req,res){
 
  let query=`SELECT Mixture.id, Mixture.start_date, Mixture.end_date, Mixture.color, MixtureComponent.MedicationName, MixtureComponent.Dose 
             FROM Mixture 
             INNER JOIN MixtureComponent 
             ON Mixture.id = MixtureComponent.MixtureId 
             WHERE Mixture.uid = ${req.uid}`;
  //let query=`SELECT * from Mixture;`
  db.all(query,(err,rows)=>{
    if(err){
      console.log(err);
    }

    console.log(rows)
    
    let mixturesWithComponents = {};
    rows.forEach(row => {
      if(!mixturesWithComponents[row.id]){
        mixturesWithComponents[row.id] = {
          id: row.id,
          start_date: row.start_date,
          end_date: row.end_date,
          color: row.color,
          components: []
        };
      }
      mixturesWithComponents[row.id].components.push({
        MedicationName: row.MedicationName,
        Dose: row.Dose
      });
    });
    res.send({mixturesWithComponents: Object.values(mixturesWithComponents)});
  });
}

function addMixtureWithComponents(req, res){
  const {uid, start_date, end_date, color, components} = req.body;
  console.log(req.body)
console.log(req.uid);
  let query = "INSERT INTO Mixture (uid, start_date, end_date, color) VALUES (?,?,?,?)";
  db.run(query, [req.uid, start_date, end_date, color], function(err){
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      const MixtureId = this.lastID;
      components.forEach(component => {
        let componentQuery = "INSERT INTO MixtureComponent (MixtureId, MedicationName, Dose) VALUES (?,?,?)";
        db.run(componentQuery, [MixtureId, component.medication, component.dosage], function(err){
          if (err) {
            console.log(err);
            res.json(err);
          }
        });
      });
      //console.log(res)
      res.send("Mixture and components added successfully");
    }
  });
}

module.exports = {
  addMixtureComponent,
  addMixtureWithComponents,
  getMixtureComponent,
  getMixtureComponentsForUser,
  getMixturesWithComponentsForUser
};