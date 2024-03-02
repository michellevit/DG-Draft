import React from "react";
import "./Home.css";
import Leaderboard from "../components/Leaderboard";
import { LoggedInProps } from "../types/interfaces";

const Home: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="home-container">
    <h2>Home</h2>
    <p>Status: {loggedIn ? "Logged In" : "Not Logged In"}</p>
    <Leaderboard />
  </div>;
}

export default Home;
 