import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import Authroute from "./Routes/Authroute.js"
import authMiddleware from "./Middleware/Authmiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running 🚀");
});
app.use("/api/auth", Authroute);
app.use("/uploads",express.static("uploads"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
