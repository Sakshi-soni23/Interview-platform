import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, scale } from "motion/react";
import profile from "../assets/Images/profie.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Home,
  Bot,
  BarChart3,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Moon,
} from "lucide-react";

const Maincontent = () => {
 
  const navigate = useNavigate()
 

  
  const cards = [
    { id: 1, title: "Total Interview", values: "10" },
    { id: 2, title: "Feedbacks", values: "Positive" },
    { id: 3, title: "Results", values: "8/10" },
  ];

 
  const viewpage = () => {
    navigate("/Profile");
  };
  
  return (
    <>
      {/* Main Content */}
      <div className="flex justify-around gap-20">
        <main className="flex-1 px-6 py-7">
          <div className="flex  gap-90">
            <div>
              <motion.h1
                className="text-2xl font-bold text-purple-400 leading-3 font-mono mt-1.5"
                animate={{ scaleY: 2 }}
                transition={{ duration: 4 }}
              >
                Welcome to TalkTo AI Dashboard
              </motion.h1>
            </div>
          </div>
          {/* cards */}
          <div className="flex gap-20">
            <div className="border-2 border-purple-500 rounded-2xl mt-6 p-4 w-3xl">
              <div className="flex gap-90">
                <h1 className="font-mono text-purple-300 text-lg font-bold">
                  Information
                </h1>
                <span className="font-mono text-purple-300 ml-7">
                  {" "}
                  1 week ago...
                </span>
              </div>

              {/* Flex container for cards */}
              <div className="flex flex-wrap justify-around gap-3 mt-4 ">
                {cards.map((item, id) => (
                  <motion.div
                    key={id}
                    className="border-2 border-purple-700 w-50 h-60 rounded-2xl bg-purple-800 shadow-md shadow-purple-400 flex flex-col  p-4"
                    whileHover={{ scale: 0.7 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Card title */}
                    <h1 className="text-white font-mono font-bold text-lg">
                      {item.title}
                    </h1>

                    {/* Optional value / info */}
                    {item.values && (
                      <p className="text-white text-2xl font-extrabold mt-4">
                        {item.values}
                      </p>
                    )}

                    {/* Optional footer */}
                    <p className="text-white text-sm opacity-70 mt-auto">
                      Updated just now
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>

        
      </div>
    </>
  );
};

export default Maincontent;
