import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import "./Challenges.css";
import { useUser } from "../contexts/UserContext";
import { useError } from "../contexts/ErrorContext";
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
  const [challengeeId, setChallengeeId] = useState<number | undefined>(
    undefined
  );
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
    if (user && challengeeUsername === user.username) {
      showError("You may not challenge yourself");
      return;
    }
    try {
      const usernameExists = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user_exists`,
        { params: { username: challengeeUsername } }
      );
      if (!usernameExists.data.exists) {
        showError(`No user named '${challengeeUsername}' exists`);
        return;
      }
      setChallengeeId(usernameExists.data.id);
      const token = localStorage.getItem("sessionToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/challenges`,
        {
          event_id: selectedEventId,
          challenger_id: user?.id,
          challengee_id: usernameExists.data.id,
          start_condition: startCondition,
        },
        config
      );

      navigate("/challenges/current");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      showError("An unexpected error occurred. Please try again.");
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
            <option value="challengee">
              {challengeeUsername ? challengeeUsername : "Challengee"}
            </option>
            <option value="random">Random</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewChallenge;
