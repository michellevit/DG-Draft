import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface Event {
  id: number;
  event_name: string;
}


const Challenge: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);
  
  useEffect(() => {
    if (!user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);
  
  return (
    <div className="challenges-container">
      <h2>Challenges</h2>
      <form>
        <h1>New Challenge</h1>
        <div>
          <label>Event Name</label>
          <select>
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.event_name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Challenge;
