import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import ChallengeCard from "../components/ChallengeCard";
import { Challenge } from "../types/interfaces";
import "./Challenges.css";
import "./FormStyles.css";


const CurrentChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!loading && user && user.id) {
        try {
          const token = localStorage.getItem("sessionToken");
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/challenges/current/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setChallenges(response.data);
        } catch (error) {
          console.error("Failed to fetch current challenges", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    if (loading) {
      setIsLoading(true);
    } else {
      fetchChallenges();
    }
  }, [user, loading]);

  if (isLoading) {
    return <div className="loading-message">Loading current challenges...</div>;
  }

  if (challenges.length === 0) {
    return (
      <div className="challenge-list">
        <p>No current challenges.</p>
      </div>
    );
  }

  return (
    <div className="current-challenge-container">
      <div className="challenge-list">
        {challenges.map((challenge: Challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default CurrentChallenges;
