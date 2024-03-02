import React from "react";
import { LoggedInProps } from "../types/interfaces";

const Login: React.FC<LoggedInProps> = ({ loggedIn, setLoggedIn }) => {
  return <div className="login-container">
    <h2>Login</h2>
    <p>Status: {loggedIn ? "Logged In" : "Not Logged In"}</p>
  </div>
}

export default Login;
 