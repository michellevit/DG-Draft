import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import NewChallenge from "../components/NewChallenge";


const Challenge: React.FC = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);
  
  return (
    <div className="challenges-container">
      <h2>Challenges</h2>
      <div>
        <NewChallenge />
      </div>
    </div>
  );
};

export default Challenge;
