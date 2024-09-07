import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./UserDashboard.css";
import "../pages/FormStyles.css";

const UserDashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          setSuccessMessage("Username successfully updated!");
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Username update error:", error);
          setErrorMessage(
            error.response?.data?.error || "An unexpected error occurred"
          );
          setSuccessMessage("");
        });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && currentPassword && newPassword) {
      const token = localStorage.getItem("sessionToken");
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/${user.id}/update_password`,
          { current_password: currentPassword, new_password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then(() => {
          setCurrentPassword("");
          setNewPassword("");
          setSuccessMessage("Password successfully updated!");
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Password update error:", error);
          setErrorMessage(
            error.response?.data?.error || "An unexpected error occurred"
          );
          setSuccessMessage("");
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
        <form onSubmit={handleUsernameSubmit} id="update-username">
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

      <div id="update-password">
        <form onSubmit={handlePasswordSubmit} id="update-password">
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current password"
            id="current"
            required
          />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="New password"
            id="new"
            required
          />
          <button type="submit" id="password">Update Password</button>
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