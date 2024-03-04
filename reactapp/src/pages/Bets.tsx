import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";


const Bets: React.FC = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);
  
  return <div className="bets-container">
    <h2>Bets</h2>
  </div>
}

export default Bets;
