import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import ChallengeCard from "../components/ChallengeCard";
import { Challenge } from "../types/interfaces";

const PastChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenges/past/${user.id}`);
          setChallenges(response.data);
        } catch (error) {
          console.error('Failed to fetch current challenges', error);
        }
      }
    };
  
    fetchChallenges();
  }, [user]);

  if (challenges.length === 0) {
    return (
      <div className="challenges-list">
        <p>No past challenges.</p>
      </div>
    );
  }

  return (
    <div className="challenges-list">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default PastChallenges;
