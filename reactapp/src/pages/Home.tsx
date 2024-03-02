import React from "react";
import "./Home.css";
import { LoggedInProps } from "../types/interfaces";

const Home: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="home-container">
    <h1>Home</h1>
    <div>Status: {loggedIn ? "Logged In" : "Not Logged In"}</div>
  </div>;
}

export default Home;
 