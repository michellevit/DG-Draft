import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import ChallengeCard from '../components/ChallengeCard';
import { Challenge } from '../types/interfaces';

const CurrentChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { user, loading } = useUser();

  useEffect(() => {
    console.log("USER:", user);
    const fetchChallenges = async () => {
      if (!loading && user && user.id) { 
        try {
          console.log("USER:", user);
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenges/current/${user.id}`);
          console.log("RESPONSE DATA: ", response.data);
          setChallenges(response.data);
        } catch (error) {
          console.error('Failed to fetch current challenges', error);
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
    return <div>Loading current challenges...</div>;
  }

  if (challenges.length === 0) {
    return (
      <div className="challenges-list">
        <p>No current challenges.</p>
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
