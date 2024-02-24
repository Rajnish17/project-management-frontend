import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Import external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import baseUrl from "../api";
import axios from 'axios';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('')


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    try {
      axios.get(`${baseUrl}/user/getone/${userId}`).then((res) => {
        console.log(res.data.user.fullName);
        setName(res.data.user.fullName)
      });
    } catch (error) {
      console.log(error);
    }
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const date = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  }

  return (

    <div className='main-container'>

      <div className="topbox">
        <div className='headText'>{`welcome ${name}`}</div>
        <div className='headTime'>{date()}</div>
      </div>

      <div className="head">
        <div><h3>board</h3></div>
        <div><select name="" id="">
          <option value="">this week</option>
          <option value="">this month</option>
          <option value="">today</option>
        </select></div>
      </div>


      <div className="parent-card">
        <div className="first-card">
          <div className="card-header">
            <h3>Todo</h3>
            <div className="card-buttons">
              <FontAwesomeIcon icon={faPlus} onClick={openModal} />
              <FontAwesomeIcon icon={faBars} />
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
        </div>

        {showModal && <Modal closeModal={closeModal} />}
      </div>

    </div>
  );
};

export default Dashboard;
