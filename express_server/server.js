const express = require('express') //
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const User=require("./models/Usermodel.js")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cors")());
app.use(express.json());


const authenticateToken=(req, res, next) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
//console.log(token)
  
  if (token == null) {
    return res.status(401).send('Unauthorized: Missing token');
  }

  jwt.verify(token, "secret_key", (err, payload) => {
    if (err) {
      return res.sendStatus(403).send('Unauthorized: Invalid token 403');
    }

    req.uid= payload.id;
    next();
  });
}




app.get('/style', function(req, res) {
  
  res.sendFile(path.join(__dirname, 'front_end/style.css'));
});
app.post("/",(req,res)=>{
  console.log(req.body)
  res.end();
})



app.use("/users",require("./controllers/User.js"))

app.use(authenticateToken)


app.get("/profile",User.getDetails)

app.use("/mixtureComponent",require("./controllers/MixtureComponent.js"))
app.use("/graph",require("./controllers/Graph.js"))
app.use("/records",require("./controllers/Record.js"))
app.use("/settings",require("./controllers/Settings.js"))
app.use("/panic",require("./controllers/Panicbutton.js"))


///4 main methods : post ,get ,put ,delete
app.listen(port, () => {
  // Code.....
})

///Javascript 2010 ES6
///import , require
