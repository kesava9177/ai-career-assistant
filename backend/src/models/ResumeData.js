const mongoose=require("mongoose");
const ResumeDataSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    originalText:String,
    skills:[String],
    role:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("ResumeData",ResumeDataSchema);