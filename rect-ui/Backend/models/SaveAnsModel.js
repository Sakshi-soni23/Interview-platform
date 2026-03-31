import mongoose, { Types } from "mongoose"
import User from "./User"
const SaveQuestionAndAnswer = new mongoose.Schema({
    UserId:{
        Types:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    AiInterviewQuesAns:[
        {
            questions:String,
            answer:String,
        }
    ],
    Date:{
        Types:Date,
        default:Date.now,
    }
})
export default mongoose.model("QuestionsAndAnswer",SaveQuestionAndAnswer)