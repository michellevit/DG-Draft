import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";
import "./Challenges.css";
import "../components/Navbar.css";

const Challenges: React.FC = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  return (
    <div className="challenges-container">
      <nav>
        <ul>
          <li>
            <Link to="new">New Challenge</Link>
          </li>
          <li>
            <Link to="current">Current Challenges</Link>
          </li>
          <li>
            <Link to="past">Past Challenges</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Challenges;
