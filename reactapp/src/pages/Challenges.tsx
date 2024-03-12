import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";


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
        <Link to="new">New Challenge</Link> |{" "}
        <Link to="current">Current Challenges</Link> |{" "}
        <Link to="past">Past Challenges</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Challenges;
