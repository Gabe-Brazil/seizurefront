const express=require("express")
const router=express.Router()
const Model=require("../models/Settingsmodel.js")


router.get("/",Model.getSetting)
router.post("/",Model.createSetting)
router.put("/",Model.updateSetting)

module.exports=router


///Create - Retrieve - Update - delete
