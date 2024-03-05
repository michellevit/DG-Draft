import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

interface LeaderboardUser {
  username: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const { user } = useUser();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/leaderboard`);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((user, index) => (
          <li key={index}>{user.username} - {user.points} points</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
