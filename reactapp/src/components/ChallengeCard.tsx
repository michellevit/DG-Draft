import React, {useEffect} from "react";
import { ChallengeCardProps } from "../types/interfaces";
import "./ChallengeCard.css";

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  
  const formatDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const startDate = challenge.event.event_date_start ? formatDate(challenge.event.event_date_start) : 'Date not available';
  const endDate = challenge.event.event_date_end ? formatDate(challenge.event.event_date_end) : 'Date not available';
  const displayDate = `${startDate} - ${endDate}`;
  
  return (
    <div className="challenge-card">
      <h3>{challenge.event.event_name}</h3>
      <p>Challenger: {challenge.challenger?.username}</p>
      <p>Challengee: {challenge.challengee?.username}</p>
      <p>Date: {displayDate}</p>
      <p>Status: {challenge.status}</p>
    </div>
  );
};

export default ChallengeCard;
