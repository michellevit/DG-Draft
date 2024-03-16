import React from "react";
import { ChallengeCardProps } from "../types/interfaces";
import "./ChallengeCard.css";

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const formatDate = (date: Date) => { 
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const startDate = formatDate(challenge.event_date_start);
  const endDate = formatDate(challenge.event_date_end);
  const displayDate = `${startDate} - ${endDate}`;
  
  return (
    <div className="challenge-card">
      <h3>{challenge.event_name}</h3>
      <p>Challenger: {challenge.challenger?.username}</p>
      <p>Challengee: {challenge.challengee?.username}</p>
      <p>Date: {displayDate}</p>
      <p>Status: {challenge.status}</p>
    </div>
  );
};

export default ChallengeCard;
