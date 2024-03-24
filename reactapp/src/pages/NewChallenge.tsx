import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import "./Challenges.css";
import { Event } from "../types/interfaces";
import { useUser } from "../contexts/UserContext";
import { useError } from "../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

const NewChallenge: React.FC = () => {
  const { showError } = useError();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [challengeeUsername, setChallengeeUsername] = useState("");
  const [startCondition, setStartCondition] = useState("random");
  const [division, setDivision] = useState("MPO");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        setAllEvents(response.data);
        if (!selectedEventId && response.data.length > 0) {
          setSelectedEventId(response.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && challengeeUsername === user.username) {
      showError("You may not challenge yourself...");
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
          division: division,
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
      <div className="challenge-list">
        <div className="challenge-card">
          <form onSubmit={handleSubmit}>
            <h3>Create New Challenge</h3>
            <table>
              <tbody>
                <tr>
                  <th>Challenger:</th>
                  <td>
                    <b>{user?.username}</b>
                  </td>
                </tr>
                <tr>
                  <th>Challengee Username:</th>
                  <td>
                    <input
                      type="text"
                      value={challengeeUsername}
                      onChange={(e) => setChallengeeUsername(e.target.value)}
                      placeholder="Enter challengee's username"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>Event:</th>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <th>Division:</th>
                  <td>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                    >
                      <option value="MPO">MPO</option>
                      <option value="FPO">FPO</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Who Picks First?</th>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewChallenge;
