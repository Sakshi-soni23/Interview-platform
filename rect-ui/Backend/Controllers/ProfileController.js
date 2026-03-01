import Profile from "../models/Profile.js";
import User from "../models/User.js";


   
    
const createOrUpdateProfile = async (req, res) => {
    

    try {
        const userId = req.user._id; // if using auth middleware

        const {
            name,
            email,
            domain,
            technicalLevel,
            technicalSkills
        } = req.body;

        const existingProfile = await Profile.findOne({ userId });

        const profileData = {
            userId,
            name,
            email,
            domain,
            technicalLevel,
            technicalSkills: technicalSkills
                ? technicalSkills.split(",")
                : [],
            isCompleted: true
        };

        // If files uploaded
        if (req.files?.dp) {
            profileData.dp = req.files.dp[0].path;
        }

        if (req.files?.resume) {
            profileData.resume = req.files.resume[0].path;
        }

        let profile;

        if (existingProfile) {
            profile = await Profile.findOneAndUpdate(
                { userId },
                profileData,
                { new: true }
            );
        } else {
            profile = await Profile.create(profileData);
        }
        // ✅ FIX 2: update User.isCompleted
        await User.findByIdAndUpdate(userId, {
            isCompleted: true
        });
        res.status(200).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select(
            "username email profile isCompleted"
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default createOrUpdateProfile ;
