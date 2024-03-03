import React from "react";
import { useUser } from "../contexts/UserContext";
import UserDashboard from "../components/UserDashboard";


const Profile: React.FC = () => {
  const { user } = useUser();
  return <div className="profile-container">
    <h2>Profile</h2>
    <p>Status: {user ? "Logged In" : "Not Logged In"}</p>
    <UserDashboard />
    <button type="button">Logout</button>
  </div>;
}

export default Profile;
