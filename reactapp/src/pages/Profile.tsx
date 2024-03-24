import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserDashboard from "../components/UserDashboard";
import "./Profile.css";


const Profile: React.FC = () => {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);
  
  const handleLogout = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
      .then(() => {
        setUser(null); 
        localStorage.removeItem('sessionToken');
        navigate("/");         
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };
  return <div className="profile-container">
    <h2>Profile</h2>
    <UserDashboard />
    <button onClick={handleLogout}>Logout</button>
  </div>;
}

export default Profile;
