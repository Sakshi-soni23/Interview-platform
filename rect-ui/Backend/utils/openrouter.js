import axios from "axios";

export const askAI = async (messages) => {
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

    return response.data.choices[0].message.content;
};