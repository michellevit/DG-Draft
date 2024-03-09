import React from "react";
import "./ErrorModal.css";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal-container" onClick={onClose}>
        <div className="error-modal" onClick={(e) => e.stopPropagation()}>
          {" "}
          <div className="error-modal-content">
            <h2>Error:</h2>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
