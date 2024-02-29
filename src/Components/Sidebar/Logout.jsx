import React from 'react';
import './Logout.css';

const Logout = ({ onConfirmLogout, onClose }) => {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="buttons">
          <button onClick={onConfirmLogout}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
