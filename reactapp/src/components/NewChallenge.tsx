import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./Challenge.css";

interface Event {
  id: number;
  event_name: string;
  event_date_start: string;
}

const Challenge: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [challengeeUsername, setChallengeeUsername] = useState("");
  const [startCondition, setStartCondition] = useState("random");
  const { user, loading } = useUser();
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

  return (
    <div className="new-challenge-container">
      <form>
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
          <select>
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
        <div><button type="submit">Submit</button></div>=
      </form>
    </div>
  );
};

export default Challenge;
