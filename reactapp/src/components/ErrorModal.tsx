import React from 'react';
import './ErrorModal.css'; 

interface ErrorModalProps {
  message: string;
  onClose: () => void; 
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="error-modal-backdrop" onClick={onClose}>
      <div className="error-modal" onClick={(e) => e.stopPropagation()}> {/* Prevents click inside the modal from closing it */}
        <div className="error-modal-content">
          <h2>Oops!</h2>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
