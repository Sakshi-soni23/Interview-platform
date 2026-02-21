import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, scale } from "motion/react";
import profile from "../assets/Images/profie.jpg"
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
  
   const cards = [
     { id: 1, title: "Total Interview", values: "10" },
     { id: 2, title: "Feedbacks", values: "Positive" },
     { id: 3, title: "Results", values: "8/10" },
   ];

  

    const navigate = useNavigate();
    const viewpage = () => {
      navigate("/Profile");
    };
  return (
    <>
      {/* Main Content */}
      <div className='flex justify-around gap-20'>
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

        {/* Profile Card */}
        <div className="mt-12">
          <div
            className="w-80 rounded-2xl border-2 border-purple-200 dark:border-purple-500 
                bg-white dark:bg-gray-900 p-6 shadow-md hover:shadow-xl transition mt-6"
          >
            {/* Top Section */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={profile}
                  alt="profile"
                  className="w-20 h-23 rounded-full object-cover border-4 border-purple-500"
                />
                {/* Online Status */}
                <span
                  className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 
                       border-2 border-white rounded-full"
                ></span>
              </div>

              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Ieren Orel
                </h1>
                <p className="text-sm text-gray-500">iren43@gmail.com</p>

                {/* Role Badge */}
                <span
                  className="inline-block mt-2 px-3 py-1 text-xs 
                       bg-purple-100 text-purple-600 
                       dark:bg-purple-800 dark:text-purple-200 rounded-full"
                >
                  MERN Stack Developer
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Stats */}
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Avg Score</span>
                <span className="font-semibold text-purple-600">7 / 10</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-[70%]"></div>
              </div>

              <div className="flex justify-between">
                <span>Activity</span>
                <span className="text-green-500 font-medium">Online</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={viewpage}
                className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-sm
                       hover:bg-purple-700 transition"
              >
                View Profile
              </button>
              <button
                onClick={viewpage}
                className="flex-1 py-2 rounded-xl border border-purple-500 
                       text-purple-600 text-sm hover:bg-purple-50 transition"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maincontent