import React from "react";
import Registration from "../components/auth/Registration";
import { LoggedInProps } from "../types/interfaces";


const Signup: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="signup-container">
    <Registration loggedIn={loggedIn}/>
  </div>;
}

export default Signup;