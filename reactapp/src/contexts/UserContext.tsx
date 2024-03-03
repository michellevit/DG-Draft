import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";

interface User {
  id?: number;
  email: string;
  username: string;
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
    const token = localStorage.getItem('sessionToken');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_URL}/validate_token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.data.valid) {
          setUser(response.data.user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(error => {
        localStorage.removeItem('sessionToken');
        console.log("Check login error", error);
      });
    }
  }, []);
  useEffect(() => {
    if (loggedIn && user) {
      axios.get(`${process.env.REACT_APP_API_URL}/username`, { withCredentials: true })
        .then(response => {
          setUser((prevUser: User | null) => {
            if (prevUser) {
              return { ...prevUser, username: response.data.username };
            }
            return null;
          });
        })
        .catch(error => {
          console.log("Fetch username error", error);
        });
    }
  }, [loggedIn]);

  const value = { user, setUser, loggedIn, setLoggedIn };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
