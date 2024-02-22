import React, { useState } from 'react';
import './dashboard.css'; // Import external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // Import Modal component

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="parent-card">
      <div className="card-header">
        <h3>Todo</h3>
        <div className="card-buttons">
          <FontAwesomeIcon icon={faPlus} onClick={openModal} />
          <FontAwesomeIcon icon={faEllipsisV} onClick={toggleDropdown} />
        </div>
      </div>

      <div className="child-card">
        <div className="card-header">
          <h3>Child Todo</h3>
          <div className="card-buttons">
            <FontAwesomeIcon icon={faEllipsisV} onClick={toggleDropdown} />
          </div>
        </div>
        {showDropdown && (
          <div className="dropdown">
            <div>Edit</div>
            <div>Share</div>
            <div>Delete</div>
          </div>
        )}
      </div>

      {showModal && <Modal closeModal={closeModal} />} {/* Render the Modal component conditionally */}
    </div>
  );
};

export default Dashboard;
