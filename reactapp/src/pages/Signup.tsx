import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Signup.css";
import { useUser } from '../contexts/UserContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successfulSubmission, setSuccessfulSubmission] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { setUser, setLoggedIn } = useUser(); 
  const navigate = useNavigate(); 

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSuccessfulSubmission(false);
      setConfirmationMessage("Passwords do not match.");
      return; 
    }

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
        const { email, username } = response.data.user;
        setUser({ email, username }); 
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setSuccessfulSubmission(true);
        setConfirmationMessage("You have been registered successfully and will be redirected to your profile page.")
        if (setLoggedIn) { 
          setLoggedIn(true);
        }
        localStorage.setItem('sessionToken', response.data.token);
        setTimeout(() => {
          navigate("/profile");
        }, 4000); 
      }
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        setConfirmationMessage(error.response.data.errors.join(", "));
      } else {
        setConfirmationMessage("An unexpected error occurred.");
      }
      setSuccessfulSubmission(false);
    });
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

export default Signup;
