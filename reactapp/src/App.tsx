import React from "react";
import { Route, Routes } from 'react-router-dom'; 
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bets from "./pages/Bets";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="bets" element={<Bets />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;