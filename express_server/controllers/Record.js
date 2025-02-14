const express=require("express")
const router=express.Router()
const Model=require("../models/Recordmodel.js")


router.get("/" , Model.getRecordsOfUser);
router.get("/:id" , Model.getSingleRecord);
router.post("/",Model.addRecord)
router.post("/seed",Model.createSeeds)
router.delete("/",Model.deleteAll)
router.delete("/:id",Model.deleteRecordsOfUser)
router.put("/:id",Model.updateRecordsOfUser)





module.exports=router

/*


  */