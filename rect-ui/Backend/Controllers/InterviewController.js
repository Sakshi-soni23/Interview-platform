import Profile from "../models/Profile";

export const getResumePath = async (req, res) => {
    const profile = await Profile.findOne({ userId: req.user._id })
    const resumepath = profile.resume
}

