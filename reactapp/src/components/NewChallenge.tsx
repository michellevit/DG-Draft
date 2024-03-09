import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import "./Challenge.css";
import { useUser } from "../contexts/UserContext";
import { useError } from '../contexts/ErrorContext';

interface Event {
  id: number;
  event_name: string;
  event_date_start: string;
}

const Challenge: React.FC = () => {
  const { showError } = useError();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [challengeeUsername, setChallengeeUsername] = useState("");
  const [startCondition, setStartCondition] = useState("random");
  const { user, loading } = useUser();

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
    const usernameExists = await axios.get(`${process.env.REACT_APP_API_URL}/user_exists`, { params: { username: challengeeUsername } });
    if (!usernameExists.data.exists) {
      showError('Invalid username'); 
      return;
    }
  };

  return (
    <div className="new-challenge-container">
      <form onSubmit={handleSubmit}>
        <h1>New Challenge</h1>
        <div>
          <label>{user?.username} VS</label>
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
          <select required>
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

export default Challenge;
