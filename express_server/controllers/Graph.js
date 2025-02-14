const express=require("express")
const router=express.Router()
const Model=require("../models/Graphmodel.js")
///post | get |put |delete CRUD

//2021 - 2024

///start year 2021 . end 2024
router.get("/",Model.getGraphSeizures)
router.get("/first",Model.getFirstSeizure)
router.get("/last",Model.getLastSeizure)


module.exports=router