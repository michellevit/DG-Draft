import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserDashboard from "../components/UserDashboard";
import "./FormStyles.css";


const Profile: React.FC = () => {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);
  


  return <div className="form-container">
    <h1>Welcome {user ? user.username : ""}!</h1>
    <UserDashboard />
    </div>;
}

export default Profile;
