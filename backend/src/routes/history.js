const express=require('express');
const ResumeData=require('../models/ResumeData');
const authMiddleware = require("../middleware/authMiddleware");

const router=express.Router();
// Route to get all resume history
router.get('/',authMiddleware,async (req,res)=>{
    try{
        const history=await ResumeData.find({userId:req.user.userId}).sort({createdAt:-1}).limit(20);
        return res.json({history});
    } catch(err){
        console.error("Error fetching history:",err);
        return res.status(500).json({error:"failed to fetch history"});
    }
});

module.exports=router;
