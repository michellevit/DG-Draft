import React, { createContext, useContext, useState, ReactNode } from 'react';
import ErrorModal from "../components/ErrorModal";

interface ErrorContextType {
  showError: (message: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

export const ErrorProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showError = (message: string) => {
    setErrorMessage(message);
    setVisible(true);
  };

  const hideError = () => {
    setVisible(false);
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}
      {visible && <ErrorModal message={errorMessage} onClose={hideError} />}
    </ErrorContext.Provider>
  );
};
