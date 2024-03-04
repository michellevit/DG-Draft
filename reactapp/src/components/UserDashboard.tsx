import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const UserDashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState<string>(""); 
  const [errorMessage, setErrorMessage] = useState<string>(""); 

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  useEffect(() => {
    setErrorMessage("");
    if(user) {
      console.log("User:", user);
      console.log("Session Token: ", localStorage.getItem('sessionToken'))
      console.log("Username: ", user ? user.username : "none");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const token = localStorage.getItem('sessionToken');
      console.log("Sending token: ", token);
      axios.patch(`${process.env.REACT_APP_API_URL}/users/${user.id}/update_username`, { username: newUsername }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      .then(response => {
        console.log("Response from server: ", response.data);
        setUser({ ...user, username: response.data.user.username });
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
