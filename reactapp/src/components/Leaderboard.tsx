import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";
import { useUser } from "../contexts/UserContext";

interface LeaderboardUser {
  id: number;
  username: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/leaderboard`
        );
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h3>Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((leaderboardUser, index) => (
            <tr
              key={leaderboardUser.id}
              className={user && user.id === leaderboardUser.id ? "current-user" : ""}
            >
              <td>{index + 1}</td>
              <td>{leaderboardUser.username}</td>
              <td>{leaderboardUser.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
