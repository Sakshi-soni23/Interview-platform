import mongoose, { connect } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        require: true
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
