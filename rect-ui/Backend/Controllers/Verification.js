import Otp from "../models/Otp.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1️⃣ Find OTP
        const otpRecord = await Otp.findOne({ email, otp: String(otp) });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // 2️⃣ Check expiry
        if (new Date(otpRecord.expiresAt).getTime() < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // 3️⃣ Find user FIRST ✅
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // 🔥 4️⃣ TRACK LOGIN DAY (CALENDAR LOGIC)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const alreadyLoggedInToday = user.loginDates.some(
            (d) => d.getTime() === today.getTime()
        );

        if (!alreadyLoggedInToday) {
            user.loginDates.push(today);
        }

        user.lastLogin = new Date();
        await user.save();

        // 4️⃣ Delete OTP
        await Otp.deleteMany({ email });

        // 5️⃣ Generate JWT AFTER user exists ✅
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "OTP verification failed" });
    }
};
