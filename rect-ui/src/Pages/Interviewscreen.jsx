import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import interviewrobot from "../assets/Images/interviewrobot.png";

const Interviewscreen = () => {
  const [answer, setAnswer] = useState("");
  const [Ques, setQues] = useState("Loading question...");
  const recognitionRef = useRef(null);

  // 🔊 AI Speak Question
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // 📥 Get Question From Backend
  const getQuestions = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/generate-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log("Question:", data.question);

      setQues(data.question);

      setTimeout(() => {
        speak(data.question);
      }, 500);
    } catch (error) {
      console.log(error);
      setQues("Error loading question");
    }
  };

  // 🎤 Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = true;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    getQuestions();
  }, []);

  // 🎤 Start Listening
  const startListening = () => {
    recognitionRef.current.start();
  };

  // ➡️ Next Question
  const nextQuestion = () => {
    setAnswer("");
    getQuestions();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
          {/* Left Side - AI */}
          <div className="flex flex-col items-center border border-gray-600 rounded-xl p-4 w-full md:w-1/2">
            <img
              src={interviewrobot}
              alt="AI"
              className="w-40 h-40 object-contain mb-4"
            />

            <div className="bg-gray-800 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-300">AI Question:</p>
              <p className="mt-1">{Ques}</p>
            </div>
          </div>

          {/* Right Side - Answer */}
          <div className="flex flex-col border border-gray-600 rounded-xl p-4 w-full md:w-1/2">
            <p className="text-sm text-gray-300 mb-2">Your Answer:</p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-800 p-3 rounded-lg h-40 resize-none outline-none"
              placeholder="Speak or type your answer here..."
            ></textarea>

            {/* Mic Button */}
            <button
              onClick={startListening}
              className="mt-3 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg"
            >
              <FaMicrophone />
              Start Speaking
            </button>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700"
            onClick={nextQuestion}
          >
            Next
          </button>

          <button className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700">
            Finish
          </button>
        </div>
      </div>
    </>
  );
};

export default Interviewscreen;
