import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./UserDashboard.css";
import "../pages/FormStyles.css";

const UserDashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setNewUsername(value);
      console.log("NEW USERNAME: ", value);
      setErrorMessage("");
      setSuccessMessage(""); // Clear success message when user types
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
      const token = localStorage.getItem("sessionToken");
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/${user.id}/update_username`,
          { username: newUsername },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          setUser({ ...user, username: response.data.user.username });
          setNewUsername("");
          setSuccessMessage("Username successfully updated!"); // Set success message
          setErrorMessage(""); // Clear any existing error message
        })
        .catch((error) => {
          console.error("Username update error:", error);
          setErrorMessage(
            error.response?.data?.error || "An unexpected error occurred"
          );
          setSuccessMessage(""); // Clear success message on error
        });
    }
  };

  const handleLogout = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
        localStorage.removeItem("sessionToken");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <div id="points">Points {user ? user.points : 0}</div>
      <div id="update-username">
        <form onSubmit={handleSubmit} id="update-username">
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder="Enter new username"
            required
          />
          <button type="submit">Update Username</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
      <div id="logout">
        <button onClick={handleLogout} className="form-button" id="logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
