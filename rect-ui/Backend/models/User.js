import mongoose, { connect } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true
},
    // 🔥 ADD THESE TWO
    lastLogin: {
        type: Date,
    },
    loginDates: {
        type: [Date],
        default: [],
    },
},

{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User
