import express from "express";
import { RegisterUser, loginUser } from "../Controllers/AuthController.js";
import { verifyOTP } from "../Controllers/Verification.js";
import createOrUpdateProfile from "../Controllers/ProfileController.js";
import authMiddleware from "../Middleware/Authmiddleware.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);

router.post(
    "/complete",
    authMiddleware,
    upload.fields([
        { name: "dp", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    
    createOrUpdateProfile
);
router.get("/getme",)

export default router;
