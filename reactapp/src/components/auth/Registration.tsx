import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./Registration.css";
import { LoggedInProps } from "../../types/interfaces";

const Registration: React.FC<LoggedInProps> = ({ loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successfulSubmission, setSuccessfulSubmission] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");


  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/registrations`, {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === "created") {
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setSuccessfulSubmission(true);
        setConfirmationMessage("You have been registered successfully.")
      }
    }).catch(error => {
      console.log("registration error", error);
      setSuccessfulSubmission(false);
      setConfirmationMessage("The passwords do not match.")
    })
  }

  return (
  <div className="registration-container">
    <h2>Sign up for an account</h2>
    <form onSubmit={handleSubmit}>
    <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email"
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            value={passwordConfirmation} 
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            placeholder="Confirm password"
            required
          />
        </div>
        <button type="submit">Register</button>
    </form>
    {confirmationMessage && <div className={successfulSubmission ? "success" : "fail"}>{confirmationMessage}</div>}
  </div>
  )
}

export default Registration;
