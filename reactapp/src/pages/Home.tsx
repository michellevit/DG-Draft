import React from "react";
import "./Home.css";
import Leaderboard from "../components/Leaderboard";
import { useUser } from "../contexts/UserContext";

const Home: React.FC = () => {
  // const { user } = useUser();
  return <div className="home-container">
    <Leaderboard />
  </div>;
}

export default Home;
 