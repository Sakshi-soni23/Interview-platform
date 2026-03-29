import { askAI } from "../../Backend/utils/openrouter"
 const genetratequetion = async ()=>{
     const resumetext = "your extracted resume text is here"
     const message = [
         {
             role: "system",
             content: "This is an Ai interview , always return valid JSON"
         },
         {
             role: "user",
             content: `this is resume${resumetext}
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

     ]
     const result = await askAI(message)
     console.log(result)

}
genetratequetion();


