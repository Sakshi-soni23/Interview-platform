import React from "react";
import Sidebar from "./Sidebar";
import profile from "../assets/Images/profie.jpg";
import { useState } from "react";
import axios from "axios"
const Profile = () => {
  const [profileImage,setprofileImage] = useState(null)
  const [technicalInput, setTechnicalInput] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [overallLevel, setOverallLevel] = useState("Beginner");
  const [form,setform] =useState({
    name :"",
    email :"",
    domain:"",
    technicalLevel:"",
    technicalskills:[]

  })
  const [dp,setdp] = useState(null)
  const [resume,setresume] = useState(null)
const addtechnicalskill = () =>{
  if (technicalInput.trim() === "") return;
  if (technicalSkills.includes(technicalInput)) return;
  setTechnicalSkills([...technicalSkills,technicalInput])
  setTechnicalInput("")

}
const removerskill = (index) =>{
   setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));

}
const uploadimages = (e) => {
  const file = e.target.files[0];

  if (file) {
    setdp(file); // backend ke liye save

    const imgurl = URL.createObjectURL(file);
    setprofileImage(imgurl); // preview ke liye
  }
};

const Handleform = (e)=>{
  setform(
    {
      ...form,
      [e.target.name] :e.target.value
    }
  )
}
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login again");
    return;
  }
  

  // text fields
  data.append("name", form.name);
  data.append("email", form.email);
  data.append("domain", form.domain);
  data.append("technicalLevel", overallLevel);
 data.append("technicalSkills", technicalSkills.join(","));


  // files (only if present)
  if (dp) data.append("dp", dp);
  if (resume) data.append("resume", resume);

  try {
    
    const res = await axios.post(
      "http://localhost:5000/api/auth/complete",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      },
    );
    localStorage.setItem("token", res.data.token); 

    alert("Profile Completed!");
    console.log(res.data);
  } catch (err) {
    console.error("Backend Error:", err.response?.data || err.message);
  }
};
    

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Heading */}
        <h1 className="text-purple-500 text-2xl font-mono px-10 py-6">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="border-2 border-purple-500 mx-10 rounded-2xl p-6 bg-black">
          <div className="flex gap-10">
            {/* LEFT SECTION */}
            <div className="w-1/3 flex flex-col items-center">
             <img
                src={profileImage || profile}
                alt="Profile"
                className="w-30 h-30 rounded-full border-2 border-purple-500 object-cover"
              />

              <label className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded-lg mt-4">
                Upload DP
                <input
                  type="file"
                  name="dp"
                 
                  accept="image/*"
                  onChange={uploadimages}
                  className="hidden"
                />
              </label>

              <h2 className="font-mono text-lg text-purple-600 mt-8 mb-4">
                Basic Details
              </h2>

              <div className="flex flex-col gap-5  px-4">
                <div className="flex justify-between items-center gap-20">
                  <label className="font-mono text-purple-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={form.name}
                    onChange={Handleform}
                    
                    className="border border-purple-300 rounded px-3 py-1 w-40 text-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center gap-20">
                  <label className="font-mono text-purple-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={Handleform}
                    placeholder="Enter Email"
                    className="border border-purple-300 rounded px-3 py-1 w-40 text-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center gap-20">
                  <label className="font-mono text-purple-700">Domain</label>
                  <input
                    type="text"
                    name="domain"
                    value={form.domain}
                    onChange={Handleform}
                    placeholder="Frontend / AI / ML"
                    className="border border-purple-300 rounded text-white px-3 py-1 w-40 focus:outline-none"
                  />
                </div>
              </div>
            </div>

           
            {/* RIGHT SECTION */}
            <div className="w-2/3 border-l border-purple-300 pl-8">
              <h1 className="text-purple-600 text-lg font-mono mb-4">
                Technical Skills
              </h1>

              <div className="bg-purple-950 text-white p-6 rounded-2xl">
                {/* Overall Level */}
                <div className="mb-4 flex items-center gap-4 text-white">
                  <label className="font-mono text-purple-700">
                    Overall Level
                  </label>
                  <select
                    value={overallLevel}
                    onChange={(e) => setOverallLevel(e.target.value)}
                    className="border border-purple-300 rounded-lg px-3 py-2"
                  >
                    <option className="bg-gray-800 text-white">Beginner</option>
                    <option className="bg-gray-800 text-white">
                      Intermediate
                    </option>
                    <option className="bg-gray-800 text-white">Advanced</option>
                  </select>
                </div>

                {/* Input Row */}
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={technicalInput}
                    onChange={(e) => setTechnicalInput(e.target.value)}
                    placeholder="Add technical skill (React, Python, SQL)"
                    className="flex-1 border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <button
                    onClick={addtechnicalskill}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Add
                  </button>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-3">
                  {technicalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-200 text-purple-800 px-4 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removerskill(index)}
                        className="hover:text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {/* resume section */}
              <div>
                <h1 className="text-purple-300 font-mono text-lg mt-8">
                  Upload Resume
                </h1>
                <div>
                  <input
                    type="file"
                    name="resume"
                    onChange={(e)=>{
                      setresume(e.target.files[0])
                    }}
                    accept=".pdf,.doc,.docx"
                    id=""
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-700 file:text-white hover:file:bg-purple-900 file:mt-4"
                  />
                </div>
              </div>
              <div className="mt-24">
                <button className="border-2 border-purple-600 text-white  rounded p-1 w-30 "onClick={handleSubmit}>
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
