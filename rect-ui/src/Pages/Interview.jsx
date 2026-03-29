import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const navigate = useNavigate()
  const startbtn = () =>{
    navigate("/interviewscreen")
  }
  return (
    <div className="h-screen bg-purple-950 relative">
      {/* Title */}
      <h1 className="text-purple-400 text-3xl text-center pt-10">
        Interview Instructions
      </h1>

      {/* Center Line */}
      <span className="absolute left-1/2 top-24 h-[70%] w-[2px] bg-purple-700 -translate-x-1/2"></span>

      {/* LEFT POINT 1 */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-[20%] top-40  text-white"
      >
        <span className="border-2 border-purple-500 bg-purple-600 w-7   h-7 flex  align-middle justify-center rounded-[50%] text-black">
          1
        </span>
        Make sure you have completed your profile with resume
      </motion.div>

      {/* RIGHT POINT 1 */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-[20%] top-56  text-white"
      >
        <span className="border-2 border-purple-500 bg-purple-600 w-7  h-7 flex  align-middle justify-center rounded-[50%] text-black">
          2
        </span>
        Allow the permission for mic and camera
      </motion.div>

      {/* LEFT POINT 2 */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute left-[20%] top-72  text-white"
      >
        <span className="border-2 border-purple-500 bg-purple-600 w-7   h-7 flex  align-middle justify-center rounded-[50%] text-black">
          3
        </span>
        Ai ask question one by one
      </motion.div>

      {/* RIGHT POINT 2 */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute right-[20%] top-88  text-white"
      >
        <span className="border-2 border-purple-500 bg-purple-600 w-7   h-7 flex  align-middle justify-center rounded-[50%] text-black">
          4
        </span>
        Clearly speak answer and also type the answer
      </motion.div>
      {/* LEFT POINT 2 */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="absolute left-[20%] top-100  text-white"
      >
        <span className="border-2 border-purple-500 bg-purple-600 w-7   h-7 flex  align-middle justify-center rounded-[50%] text-black">
          5
        </span>
        After complete question click on finish button
      </motion.div>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute right-[20%] top-120 "
      >
        <motion.button
          whileHover={{
            scale: 1.3,
            // Will be used when gesture starts
            transition: { duration: 0.1 },
          }}
          whileTap={{
            scale:0.9
          }}
          className="border-2 rounded-tl-2xl rounded-br-2xl p-2 font-mono hover:cursor-pointer bg-[#BBE0EF] shadow-[0_6px_20px_rgba(20,225,225,225)] " onClick={startbtn}
        >
          Start Interview
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Interview;
