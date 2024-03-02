import React from "react";
import { LoggedInProps } from "../types/interfaces";
import UserDashboard from "../components/UserDashboard";


const Profile: React.FC<LoggedInProps> = ({ loggedIn, setLoggedIn }) => {
  return <div className="profile-container">
    <h2>Profile</h2>
    <p>Status: {loggedIn ? "Logged In" : "Not Logged In"}</p>
    <UserDashboard />
  </div>;
}

export default Profile;
