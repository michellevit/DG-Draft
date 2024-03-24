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
  
  const isEventOngoingOrFuture = () => {
    const today = new Date();
    const endDate = new Date(challenge.event.event_date_end);
    return today <= endDate;
  };

  let divisionClass = '';
  if (isEventOngoingOrFuture()) {
    divisionClass = challenge.division === 'MPO' ? 'mpo' : challenge.division === 'FPO' ? 'fpo' : '';
  }

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
    <div className={`challenge-card ${divisionClass}`}>
      <table>
        <tbody>
          <tr><th>Event</th><td><b>{challenge.event.event_name}</b></td></tr>
          <tr><th>Date</th><td>{displayDate}</td></tr>
          <tr><th>Division</th><td>{challenge.division}</td></tr>
          <tr><th>Challenger</th><td>{challenge.challenger?.username}</td></tr>
          <tr><th>Challengee</th><td>{challenge.challengee?.username}</td></tr>
          <tr><th>First Pick</th><td>{challenge.start_condition}</td></tr>
          <tr><th>Status</th><td>{challenge.status}</td></tr>
        </tbody>
      </table>
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