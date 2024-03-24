import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import NewChallenge from "./pages/NewChallenge";
import CurrentChallenges from "./pages/CurrentChallenges";
import PastChallenges from "./pages/PastChallenges";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { UserProvider } from "./contexts/UserContext";
import { ErrorProvider } from "./contexts/ErrorContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <ErrorProvider>
        <div className="app">
          <Navbar />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="challenges" element={<Challenges />}>
                <Route index element={<CurrentChallenges />} />
                <Route path="new" element={<NewChallenge />} />
                <Route path="current" element={<CurrentChallenges />} />
                <Route path="past" element={<PastChallenges />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Routes>
          </div>
        </div>
      </ErrorProvider>
    </UserProvider>
  );
};

export default App;
