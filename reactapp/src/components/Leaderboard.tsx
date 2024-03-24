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
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/leaderboard`
        );
        setLeaderboardData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
        setIsLoading(false);
      }
    };
    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : (
            leaderboardData.map((leaderboardUser, index) => (
              <tr
                key={leaderboardUser.id}
                className={
                  user && user.id === leaderboardUser.id ? "current-user" : ""
                }
              >
                <td>{index + 1}</td>
                <td>{leaderboardUser.username}</td>
                <td>{leaderboardUser.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
