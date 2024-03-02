import React from "react";
import { LoggedInProps } from "../types/interfaces";


const Bets: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="bets-container">
    <h2>Bets</h2>
  </div>;
}

export default Bets;
