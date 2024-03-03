import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bets from "./pages/Bets";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/UserContext"; 



const App: React.FC = () => {
  return (
    <UserProvider>
    <div className="app">
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="bets" element={<Bets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
    </UserProvider>
  );
}

export default App;