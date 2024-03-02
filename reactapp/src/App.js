import React from "react";
import { Route, Routes } from 'react-router-dom'; 
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;