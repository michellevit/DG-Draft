import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserDashboard from "../components/UserDashboard";


const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
      .then(() => {
        setUser(null); 
        navigate("/"); 
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };
  return <div className="profile-container">
    <h2>Profile</h2>
    <p>Status: {user ? "Logged In" : "Not Logged In"}</p>
    <UserDashboard />
    <button onClick={handleLogout}>Logout</button>
  </div>;
}

export default Profile;
