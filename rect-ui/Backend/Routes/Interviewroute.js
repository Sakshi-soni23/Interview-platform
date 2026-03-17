import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/generateQ", async (req, res) => {
    try {
         const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const content = response?.data?.choice?.[0]?.message?.content
        if (!content || !content.trim()){
            throw new Error("AI is return no response")
        }
        return content
} catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI generation failed" });
    }
});

export default router;