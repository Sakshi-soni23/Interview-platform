import { askAI } from "../utils/openrouter.js";
export const QuestionGenerate = async (req,res) =>{
    try {
       const {resumetext} = req.body
        // 2. AI ko prompt bhejna
        const messages = [
            {
                role: "system",
                content: "You are an AI interviewer. Always return valid JSON only"
            },
            {
                role: "user",
                content: `
                This is my resume:
                ${resumetext}
                Generate 5 technical, 3 HR, and 2 project questions.

        IMPORTANT:
        - Return ONLY JSON
        - Do not add any explanation
        - Do not add text outside JSON

                Format:
        {
          "technical": [],
          "hr": [],
          "project": []
        }
                `
            }
        ];
        const airesponse = await askAI(messages)
        const parsequestion = JSON.parse(airesponse)
        res.status(200).json({
            success:true,
            questions:parsequestion
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error generating questions"
        });
    }
}
