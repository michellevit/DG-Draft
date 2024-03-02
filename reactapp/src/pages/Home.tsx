import React from "react";
import "./Home.css";
import Leaderboard from "../components/Leaderboard";
import { LoggedInProps } from "../types/interfaces";

const Home: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="home-container">
    <h1>Home</h1>
    <div>Status: {loggedIn ? "Logged In" : "Not Logged In"}</div>
    <Leaderboard />
  </div>;
}

export default Home;
 