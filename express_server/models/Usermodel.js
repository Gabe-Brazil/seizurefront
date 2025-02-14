const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/seizureApp.db');
const jwt = require('jsonwebtoken');


function checkIfUserExist(req,res,next){
  const {username,password,email}=req.body
  let query="select * from users where email=(?)"
   db.all(query,[email],(err,result)=>{
  if(err){
    return res.sendStatus(501)
  }
  if(result && result.length>0){
    return res.send("Another account already has the same email address")
  }
     next()
   })
}


function signUp(req,res){
const {username,password,email}=req.body
 let query="Insert into users (email,password,username) values((?),(?),(?))"
 
db.run(query,[email,password,username],function(err){
if(err){
  return res.sendStatus(501)
}
 
   const token = jwt.sign({id:this.lastID}, "secret2" );
  /*
   createSettings(this.lastID,(err)=>{
    if(err){
      return res.send({Error:true})
    }*/
  res.status(200).json(token)
  
   })


 //})
}

async function signIn(req,res){
const {email,password}=req.body
  
let query="Select (Id) from users where email=(?) AND password=(?)"
  

  db.all(query,[email,password],function(err,result){
if(err){
  return res.sendStatus(501)
}
    if(result.length < 1){
      return res.status(401).send("Email or Password is incorrect")
    } 
  
    let user= result[0]
  
 const token = jwt.sign({id:user.Id}, "secret_key"/*, { expiresIn: '24h' }*/);

  res.status(200).json(token)
    
  })
  
  
}

function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "emailVerificationSecret");
    const { id } = decoded;

    // Update the user's verification status
    const query = "UPDATE users SET is_verified = 1 WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) {
        return res.status(500).send({ error: "Failed to verify email" });
      }

      res.status(200).send({ message: "Email successfully verified! You can now log in." });
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).send({ error: "Invalid or expired token" });
  }
}

function getDetails(req,res){
  console.log(req.uid)
  let sql="select * from users where id = (?)"
  db.all(sql,[req.uid],(err,result)=>{
     console.log(result);
   let username=result[0].username
    let email = result[0].email
    let profilePic = result[0].profilePic
    let defaultDates = result[0].defaultDates ? result[0].defaultDates : []
    res.send({details:{username,email,profilePic}})
    
  })
}


module.exports={
  signUp,
  checkIfUserExist,
  signIn,
  getDetails,
}