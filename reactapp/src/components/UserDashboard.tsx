import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import "./UserDashboard.css";

const UserDashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setNewUsername(value);
      setErrorMessage(""); 
    } else {
      setErrorMessage("Username cannot exceed 25 characters"); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage) {
      return; 
    }
    if (user && newUsername) {
      const token = localStorage.getItem('sessionToken');
      axios.patch(`${process.env.REACT_APP_API_URL}/users/${user.id}/update_username`, { username: newUsername }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      .then(response => {
        setUser({ ...user, username: response.data.user.username });
        setNewUsername(""); 
      })
      .catch(error => {
        console.error("Username update error:", error.response.data.error);
        setErrorMessage(error.response.data.error)
      });
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome {user ? user.username : ""}!</h1>
      <h3>Points {user ? user.points : 0}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
          placeholder="Enter new username"
          required
        />
        <button type="submit">Update Username</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default UserDashboard;
