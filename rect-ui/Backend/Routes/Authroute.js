// routes/authRoutes.js
import express from "express";
import { RegisterUser } from "../Controllers/AuthController.js";
import { verifyOTP } from "../Controllers/Verification.js";
import { loginUser } from "../Controllers/AuthController.js";
// import authMiddleware  from "../Middleware/Authmiddleware.js"
// import { getUsageCalendar } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
// router.get("/usage-calendar", authMiddleware, getUsageCalendar);

export default router;
