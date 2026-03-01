import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Profileview = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/getprofile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-center mt-10 text-purple-700">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-purple-100">
      <div className="w-full max-w-xl bg-purple-800 rounded-2xl shadow-lg">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900">
          <IoMdArrowBack size={24} className="text-white cursor-pointer" />
          <h1 className="text-xl font-semibold text-white">My Profile</h1>
          <CiSettings size={24} className="text-white cursor-pointer" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left */}
          <div className="flex flex-col items-center">
            <img
              src={
                profile.profile?.dp
                  ? `http://localhost:5000/${profile.profile.dp}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover"
            />

            <label className="mt-4 cursor-pointer bg-purple-700 text-white px-5 py-2 rounded-full text-sm">
              Update DP
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Right */}
          <div className="text-white space-y-1">
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-purple-200">{profile.email}</p>
            <p className="italic">{profile.profile?.domain}</p>
          </div>
        </div>

        {/* Technical Info */}
        <div className="bg-purple-700 text-white p-6 rounded-b-2xl space-y-2">
          <p>
            <span className="font-semibold">Technical Level:</span>{" "}
            {profile.profile?.technicalLevel}
          </p>

          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {profile.profile?.technicalSkills?.join(", ")}
          </p>

          {profile.profile?.resume && (
            <a
              href={`http://localhost:5000/${profile.profile.resume}`}
              className="underline text-purple-200"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profileview;
