import React from "react";
import { LoggedInProps } from "../types/interfaces";
import UserDashboard from "../components/UserDashboard";
import Login from "../components/Login";


const Profile: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="profile-container">
    {loggedIn ? <UserDashboard /> : <Login /> }
  </div>;
}

export default Profile;
