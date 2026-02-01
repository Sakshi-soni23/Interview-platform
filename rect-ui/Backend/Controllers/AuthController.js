import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import { sendotpEmail } from "../utils/sendEmail.js";


export const RegisterUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


//login page

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        // delete old OTPs
        await Otp.deleteMany({ email });

        // save new OTP
        await Otp.create({
            email,
            otp:generatedOtp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
        });
        await sendotpEmail(email, generatedOtp);

        res.status(200).json({
            message: "OTP sent to email",
            userId: user._id,
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const getUsageCalendar = async(req,res)=>{
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("loginDates")
//         if (!user){
//             return res.status(404).json({ message: "User not found" });
//         }
//         const dates = user.loginDates.map(
//             (d) => d.toISOString().split("T")[0]
//         );

//         res.status(200).json(dates);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch calendar data" });
        
//     }
// }