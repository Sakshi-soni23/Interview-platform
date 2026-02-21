import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendotpEmail } from "../utils/sendEmail.js";

/* =========================
   REGISTER USER
========================= */
export const RegisterUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        // ✅ Generate JWT immediately on registration
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, // ✅ Send token to frontend
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/* =========================
   LOGIN USER (SEND OTP ONLY)
========================= */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        // Generate OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp: generatedOtp,
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        });

        await sendotpEmail(email, generatedOtp);

        res.status(200).json({
            message: "OTP sent to email",
            email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   VERIFY OTP (GENERATE TOKEN)
========================= */
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord)
            return res.status(400).json({ message: "OTP not found" });

        if (otpRecord.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (otpRecord.expiresAt < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        await Otp.deleteMany({ email });

        const user = await User.findOne({ email });

        // ✅ TOKEN GENERATED ONLY AFTER OTP VERIFIED
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "OTP verified successfully",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMe = async (req, res) => {
    try {
        const user = req.user; // comes from protect middleware
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};