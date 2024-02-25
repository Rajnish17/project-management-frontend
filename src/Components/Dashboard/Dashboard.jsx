import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Import external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faBars, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import Modal from './Modal';
import baseUrl from "../api";
import axios from 'axios';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [childData, setChildData] = useState([]);
  const [cardVisibility, setCardVisibility] = useState({}); // State for toggling individual card visibility

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    try {
      axios.get(`${baseUrl}/user/getone/${userId}`).then((res) => {
        // console.log(res.data.user.fullName);
        setName(res.data.user.fullName);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const id =localStorage.getItem("userId");
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json' // Assuming your API expects JSON data
        }
      };
      axios.get(`${baseUrl}/todo/getall/${id}`,config).then((res) => {
        // console.log(res.data);
        setChildData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [childData]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDummyData = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        dummyDataVisible: !prevState[id]?.dummyDataVisible
      }
    }));
  };

  const togglethreedot = (id) => {
    setCardVisibility(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        showOptions: !prevState[id]?.showOptions
      }
    }));
  };

  const date = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  return (
    <div className='main-container'>
      <div className="topbox">
        <div className='headText'>welcome {name && `${name}`}</div>
        <div className='headTime'>{date()}</div>
      </div>

      <div className="head">
        <div><h3>board</h3></div>
        <div>
          <select name="" id="">
            <option value="">this week</option>
            <option value="">this month</option>
            <option value="">today</option>
          </select>
        </div>
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

          {childData.map((ele, index) => (
            <div className="child-card" key={index}>
              <div className="card-header">
                <h3>{ele.title}</h3>
                <div className="card-buttons">
                  <FontAwesomeIcon icon={cardVisibility[ele._id]?.dummyDataVisible ? faAngleUp : faAngleDown} onClick={() => toggleDummyData(ele._id)} />
                  <FontAwesomeIcon icon={faEllipsisV} onClick={() => togglethreedot(ele._id)} />
                </div>
                {cardVisibility[ele._id]?.showOptions && (
                  <div className="dropdown">
                    <div>Edit</div>
                    <div>Share</div>
                    <div>Delete</div>
                  </div>
                )}
              </div>
              <div className="child-data">
                {cardVisibility[ele._id]?.dummyDataVisible && (
                  <div>
                    {ele.task.map((task, index) => (
                      <p key={index}>{task}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showModal && <Modal closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default Dashboard;
