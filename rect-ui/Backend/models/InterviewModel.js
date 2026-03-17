import mongoose from "mongoose";

const InterviewFormSchema = new mongoose.Schema({
    name:String,
    email:String,
    Domain:String,
    level:String,
    position:String,
    resume:String
},{timestamps:true})

export default mongoose.model("InterviewForm",InterviewFormSchema)