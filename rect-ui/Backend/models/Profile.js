import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    domain: String,

    dp: String,
    resume: String,

    technicalLevel: String,
    technicalSkills: [String],

    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile
