import React from 'react';
import { Challenge, ChallengeCardProps } from '../types/interfaces';

  const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
    return (
    <div className="challenge-card">
      <h3>{challenge.event_name}</h3>
      <p>Challenger: {challenge.challenger?.username}</p>
      <p>Challengee: {challenge.challengee?.username}</p>
      <p>Date: {new Date(challenge.event_date_end).toLocaleDateString()}</p>
    </div>
  );
};

export default ChallengeCard;


