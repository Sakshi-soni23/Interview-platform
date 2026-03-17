import Profile from "../models/Profile";

const profile = await Profile.findOne({userId:req.user._id})
const resumepath = profile.resume