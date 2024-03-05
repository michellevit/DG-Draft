import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/sessions`, {
      user: {
        email: email,
        password: password,
      }
    }, { withCredentials: true })
    .then(response => {
      if (response.data.logged_in) {
        setUser({ id: response.data.user.id, email: response.data.user.email, username: response.data.user.username, points: response.data.user.points });
        localStorage.setItem('sessionToken', response.data.token);
        navigate("/profile");;  
      }
    })
    .catch(error => {
      console.log("login error", error);
      setLoginError("Error logging in. Please check your credentials.");
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        {loginError && <p className="error">{loginError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
