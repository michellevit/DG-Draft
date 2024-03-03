import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const UserDashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState<string>(""); 

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, { username: newUsername }, { withCredentials: true })
        .then(response => {
          setUser({ ...user, username: response.data.user.username });
        })
        .catch(error => {
          console.error("Username update error:", error);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome {user ? user.username : ""}!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
          placeholder="Enter new username"
          required
        />
        <button type="submit">Update Username</button>
      </form>
    </div>
  );
};

export default UserDashboard;
