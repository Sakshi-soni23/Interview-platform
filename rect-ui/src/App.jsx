import React from 'react'
import './App.css'
import {motion} from "motion/react"
import Login from './Pages/Login.jsx'
import Register from "./Pages/Register.jsx"
import Dashbaord from './Pages/Dashbaord.jsx'
import { Route ,Routes } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import Profile from "./Pages/Profile.jsx"
import Result from "./Pages/Result.jsx"
import Feedback from "./Pages/feedback.jsx"
import Interview from './Pages/Interview.jsx'
import UsageCalendar from './Pages/UsageCalender.jsx'
import Profileview from "./Pages/Profileview.jsx"


function App() {
  

  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashbaord />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/result" element={<Result />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/usage-calendar" element={<UsageCalendar />} />
          <Route path="/Profileview" element={<Profileview/>}/> 
        </Routes> 
       
      </BrowserRouter>
    </>
  );
}

export default App
