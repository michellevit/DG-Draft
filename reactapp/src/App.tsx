import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bets from "./pages/Bets";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";



const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn}/>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn}/>} /> 
          <Route path="home" element={<Home loggedIn={loggedIn}/>} />
          <Route path="bets" element={<Bets  loggedIn={loggedIn}/>} />
          <Route path="profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="login" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="signup" element={<Signup loggedIn={loggedIn}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;