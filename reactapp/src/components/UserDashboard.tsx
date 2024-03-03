import React, { useState } from "react";
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
      setUser({ ...user, username: newUsername });
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome {user ? user.username : ""}</h1>
      {user && <p>Username: {user.username}</p>}
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
