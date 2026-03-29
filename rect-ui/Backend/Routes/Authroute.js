import express from "express";
import { RegisterUser, loginUser } from "../Controllers/AuthController.js";
import { verifyOTP } from "../Controllers/Verification.js";
import createOrUpdateProfile, { getProfile } from "../Controllers/ProfileController.js";
import authMiddleware from "../Middleware/Authmiddleware.js";
import upload from "../Middleware/multer.js";
import { QuestionGenerate } from "../Controllers/Questioncontroller.js";


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
router.get("/getprofile",authMiddleware,getProfile)
router.post("/generate-questions",QuestionGenerate)




export default router;
