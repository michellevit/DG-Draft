import React from "react";
import axios from "axios";
import { ChallengeCardProps } from "../types/interfaces";
import "./ChallengeCard.css";
import { useUser } from "../contexts/UserContext";

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const { user } = useUser();
  const currentUser = { id: user?.id, username: user?.username };

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
  
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/challenges/${challenge.id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to delete challenge", error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/challenges/accept/${challenge.id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to accept challenge", error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/challenges/decline/${challenge.id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to decline challenge", error);
    }
  };


  return (
    <div className="challenge-card">
      <h3>Event: {challenge.event.event_name}</h3>
      <p>Event Date: {displayDate}</p>
      <p>Divison: {challenge.division}</p>
      <p>Challenger: {challenge.challenger?.username}</p>
      <p>Challengee: {challenge.challengee?.username}</p>
      <p>Who Picks First: {challenge.start_condition}</p>
      <p>Status: {challenge.status}</p>
      {challenge.status === "Pending" && challenge.challenger?.id === currentUser.id && (
        <button onClick={handleDelete}>Delete</button>
      )}
      {challenge.status === "Pending" && challenge.challengee?.id === currentUser.id && (
        <>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDecline}>Decline</button>
        </>
      )}
    </div>
  );
};

export default ChallengeCard;
