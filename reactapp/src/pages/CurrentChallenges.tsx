import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import ChallengeCard from '../components/ChallengeCard';
import { Challenge } from '../types/interfaces';

const CurrentChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!loading && user && user.id) { 
        console.log("USER: ", user);
        try {
          const url = `${process.env.REACT_APP_API_URL}/challenges/current/${user.id}`;
          console.log("URL: ", url);
          const response = await axios.get(url);
          setChallenges(response.data);
          console.log("Response Data: ", response.data);
        } catch (error) {
          console.error('Failed to fetch current challenges', error);
          console.log("ERROR:", error);
        }
      }
    };
    fetchChallenges();
  }, [user, loading]);

  if (challenges.length === 0) {
    return (
      <div className="challenges-list">
        <p>No current challenges available.</p>
      </div>
    );
  }

  return (
    <div className="challenges-list">
      {challenges.map((challenge: Challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default CurrentChallenges;
