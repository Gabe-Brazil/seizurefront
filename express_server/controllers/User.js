const express=require("express")
const router=express.Router()
const Model=require("../models/Usermodel.js")
///post | get |put |delete CRUD


router.post("/signup",Model.checkIfUserExist,Model.signUp)
router.post("/signin",Model.signIn)


module.exports=router
