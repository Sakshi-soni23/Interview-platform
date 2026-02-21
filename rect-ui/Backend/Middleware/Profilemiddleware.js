import express from "express";
import authMiddleware from "../Middleware/Authmiddleware.js";
import upload from "../Middleware/multer.js";
import createOrUpdateProfile from "../Controllers/ProfileController.js";

const router = express.Router();

router.post(
    "/complete",
    authMiddleware,
    upload.fields([
        { name: "dp", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    
    createOrUpdateProfile
);

export default router;