import React, { useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card">
        <div className="header">
          <div className="title">Backlog</div>
          <div className="actions">
            <button className="collapse-button" onClick={toggleCollapse}>
              <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
            <button className="add-button" onClick={openModal}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="content">
            
            <ul className="items">
              {[...Array(10)].map((_, index) => (
                <li key={index} className="item">
                  Item {index + 1}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showModal && <Modal closeModal={closeModal} />}
      </div>
    </>
  );
};

export default Dashboard;
