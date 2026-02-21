import React from 'react'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import {
  Home,
  Bot,
  BarChart3,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  Moon,
} from "lucide-react";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    // const { toggletheme } = useContext(Themecontext);
    const cards = [
      { id: 1, title: "Total Interview", values: "10" },
      { id: 2, title: "Feedbacks", values: "Positive" },
      { id: 3, title: "Results", values: "8/10" },
    ];

    const menuItems = [
      { name: "Dashboard", icon: Home, path: "/" },
      { name: "AI Interviews", icon: Bot, path: "/interview" },
      { name: "Results", icon: BarChart3, path: "/result" },
      { name: "Feedback", icon: MessageSquare, path: "/feedback" },
      { name: "Profile", icon: User, path: "/profile" },
    ];

    const bottomItems = [
      { name: "Settings", icon: Settings },
      { name: "Logout", icon: LogOut },
    ];

  return (
     <div className="flex min-h-screen bg-black text-white  border border-purple-300 rounded-2xl">
      {/* Sidebar */}
      <aside
        className={`$${open ? "w-70" : "w-20"} bg-black/90 transition-all duration-300 flex flex-col justify-between`}
      >
        {/* Top */}
        <div>
          <div className="flex items-center justify-between  gap-12 px-4 py-4 border-b border-purple-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold">
                AI
              </div>
              {open && (
                <span className="text-lg font-semibold text-purple-400">
                  TalkTo AI
                </span>
              )}
            </div>
            <Menu
              className="cursor-pointer text-purple-400"
              onClick={() => setOpen(!open)}
            />
          </div>

          {/* Menu */}
          <ul className="mt-6 space-y-2 px-2">
            {menuItems.map((item, i) => (
              <NavLink
                to={item.path}
                key={i}
                className="group flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer hover:bg-purple-700/20"
              >
                <item.icon className="text-purple-400" />
                {open && <span>{item.name}</span>}

                {/* Tooltip */}
                {!open && (
                  <span className="absolute left-24 bg-purple-700 text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <ul className="mb-6 space-y-2 px-2">
          {bottomItems.map((item, i) => (
            <li
              key={i}
              className="group flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer hover:bg-purple-700/20"
            >
              <item.icon className="text-purple-400" />
              {open && <span>{item.name}</span>}

              {!open && (
                <span className="absolute left-24 bg-purple-700 text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </aside>
         
        </div>
     
       );
       }

export default Sidebar;