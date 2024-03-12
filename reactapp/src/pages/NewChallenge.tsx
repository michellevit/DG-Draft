import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import "./Challenges.css";
import { useUser } from "../contexts/UserContext";
import { useError } from '../contexts/ErrorContext';
import { useNavigate } from "react-router-dom";


interface Event {
  id: number;
  event_name: string;
  event_date_start: string;
}

const NewChallenge: React.FC = () => {
  const { showError } = useError();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [challengeeUsername, setChallengeeUsername] = useState("");
  const [startCondition, setStartCondition] = useState("random");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        setAllEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("URL: ", `${process.env.REACT_APP_API_URL}/user_exists`)
    const usernameExists = await axios.get(`${process.env.REACT_APP_API_URL}/user_exists`, { params: { username: challengeeUsername } });
    console.log("USERNAME EXISTS?: ", usernameExists.data);
    if (!usernameExists.data.exists) {
      showError('Invalid username'); 
      return;
    }
    try {
      const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user_exists`, { params: { username: challengeeUsername } });
      console.log("USER RESPONSE: ", userResponse.data);
      if (!userResponse.data.exists) {
        showError('Invalid username'); 
        return;
      }
      const challengeeId = usernameExists.data.id; 
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/challenges`, {
        event_id: selectedEventId,
        challenger_id: user?.id,
        challengee_id: challengeeId,
        start_condition: startCondition,
      });
      navigate('/challenges/current');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          showError(error.response.data.errors.join(', '));
        } else {
          showError('An unexpected error occurred.');
        }
      } else {
        console.error('An unexpected error occurred:', error);
        showError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="new-challenge-container">
      <form onSubmit={handleSubmit}>
        <h1>New Challenge</h1>
        <div>
          <label>{user?.username} vs</label>
          <input
            type="text"
            value={challengeeUsername}
            onChange={(e) => setChallengeeUsername(e.target.value)}
            placeholder="Enter challengee's username"
            required
          />
        </div>
        <div>
          <label>Event</label>
          <select 
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            required
          >
            {allEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {`${event.event_name} - ${new Date(
                  event.event_date_start
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Who Picks First?</label>
          <select
            value={startCondition}
            onChange={(e) => setStartCondition(e.target.value)}
          >
            <option value="challenger">{user?.username}</option>
            <option value="challengee">{challengeeUsername ? challengeeUsername : "Challengee"}</option>
            <option value="random">Random</option>
          </select>
        </div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  );
};

export default NewChallenge;
