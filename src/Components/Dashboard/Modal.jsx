// Modal.js

import React from 'react';
import './modal.css';

const Modal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>Close</button>
        <h2>Add Item</h2>
        {/* Add form or content for the modal */}
      </div>
    </div>
  );
};

export default Modal;
