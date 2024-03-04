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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('sessionToken');
      try {
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/authenticate_user`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.valid) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem('sessionToken');
            setUser(null);
          }
        }
      } catch (error) {
        console.log('Uh oh 2');
        localStorage.removeItem('sessionToken');
        setUser(null);
        console.log("Check login error", error);
      }finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const value = { user, setUser, loading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
