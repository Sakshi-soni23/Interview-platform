import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/getprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.profile); // ✅ VERY IMPORTANT
       
      } catch (error) {
        console.log("Profile fetch error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
