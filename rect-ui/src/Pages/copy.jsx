import React from 'react'
import { FaMicrophone } from "react-icons/fa";
import interviewrobot from "../assets/Images/interviewrobot.png";
import Skeleton from "react-loading-skeleton";

const copy = () => {
     const [answer, setAnswer] = useState("");
      const [loading , setloading] = useState(true)
    
 return loading ? (
    
     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-6">
       <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
         {/* Left Side - AI */}
         <div className="flex flex-col items-center border gap-2.5 border-gray-600 rounded-xl p-4 w-full md:w-1/2">
           <Skeleton width={400} height={200} baseColor="gray" />
 
           {/* Question Box */}
           <div className="bg-gray-800 p-3 rounded-lg w-full">
             <p className="text-sm text-gray-300">
               <Skeleton />
             </p>
             <p className="mt-1">
               <Skeleton />
             </p>
           </div>
         </div>
 
         {/* Right Side - Answer */}
         <div className="flex flex-col border border-gray-600 rounded-xl p-4 w-full md:w-1/2">
           <p className="text-sm text-gray-300 mb-2">
             <Skeleton />
           </p>
           <Skeleton className="bg-gray-800 p-3 rounded-lg h-40 resize-none outline-none" />
           {/* Mic Button */}
           <button>
             {" "}
             <Skeleton className="mt-3 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg" />
           </button>
         </div>
       </div>
       {/* Bottom Controls */}
       <div className="mt-6 flex gap-4">
         <button className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
           <Skeleton />
         </button>
 
         <button className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700">
           <Skeleton />
         </button>
 
         <button className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700">
           <Skeleton />
         </button>
       </div>
     </div>
    
   ) : (
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
 
             {/* Question Box */}
             <div className="bg-gray-800 p-3 rounded-lg w-full">
               <p className="text-sm text-gray-300">AI Question:</p>
               <p className="mt-1">
                 Tell me about yourself and your recent project.
               </p>
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
             <button className="mt-3 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg">
               <FaMicrophone />
               Start Speaking
             </button>
           </div>
         </div>
 
         {/* Bottom Controls */}
         <div className="mt-6 flex gap-4">
           <button className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
             Previous
           </button>
 
           <button className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700">
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
 


export default copy
