const express=require("express")
const router=express.Router()
const Model=require("../models/MixtureComponentmodel.js")

router.post("/withcomponents",Model.addMixtureWithComponents)
router.get("/withcomponents",Model.getMixturesWithComponentsForUser)






router.post("/",Model.addMixtureComponent)
router.get("/allusers",Model.getMixtureComponent)
router.get("/",Model.getMixtureComponentsForUser)
module.exports=router