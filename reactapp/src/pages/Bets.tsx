import React from "react";
import { LoggedInProps } from "../types/interfaces";


const Bets: React.FC<LoggedInProps> = ({ loggedIn }) => {
  return <div className="bets-container">
    <h1>Bets</h1>
  </div>;
}

export default Bets;
