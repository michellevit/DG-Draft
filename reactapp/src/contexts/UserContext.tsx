import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";

interface User {
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/logged_in`, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          setUser(response.data.user);
          setLoggedIn(true); 
        } else {
          setLoggedIn(false);
        }
      }).catch(error => {
        console.log("Check login error", error);
      });
  }, []); 

  const value = { user, setUser, loggedIn, setLoggedIn };
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
