import React from "react";
import Registration from '../components/auth/Registration'
import { LoggedInProps } from "../types/interfaces";

const Profile: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="profile-container">
    <h1>Profile</h1>
    <Registration />
  </div>;
}

export default Profile;
