import React, { useEffect, useState } from 'react';
import './dashboard.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faBars, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Add the required icons
import Modal from '../Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';

// Reusable Card component
const Card = ({ title, childData, onOpenModal, onCloseDropDown, onToggleDummyData, onToggleThreeDot, onShareTodo, onDeleteTodo, cardVisibility }) => {
  return (
    <div className='main-container'>
      <Toaster/>
      <div className="parent-card">
        <div className="first-card">
          <div className="card-header">
            <h3>{title}</h3>
            <div className="card-buttons">
              <FontAwesomeIcon icon={faPlus} onClick={onOpenModal} />
              <FontAwesomeIcon icon={faBars} onClick={onCloseDropDown} />
            </div>
          </div>

          {childData.map((ele, index) => (
            <div className="child-card" key={index}>
              <div className="card-header">
                <h3>{ele.title}</h3>
                <div className='child-data-button'>
                  <div>{new Date(ele.dueDate).toLocaleString('en-US', {day: '2-digit',month: 'short' })}</div>
                  <div className='child-button'>backlog</div>
                  <div className='child-button'>progree</div>
                  <div className='child-button'>done</div>

                </div>
                <div className="card-buttons">
                  <FontAwesomeIcon icon={cardVisibility[ele._id]?.dummyDataVisible ? faAngleUp : faAngleDown} onClick={() => onToggleDummyData(ele._id)} />
                  <FontAwesomeIcon icon={faEllipsisV} onClick={() => onToggleThreeDot(ele._id)} />
                </div>
                
                {cardVisibility[ele._id]?.showOptions && (
                  <div className="dropdown">
                    <div>Edit</div>
                    <div onClick={() => onShareTodo(ele._id)}>Share</div>
                    <div onClick={() => onDeleteTodo(ele._id)}>Delete</div>
                  </div>
                )}
              </div>
              <div className="child-data">
                {cardVisibility[ele._id]?.dummyDataVisible && (
                  <div>
                    {ele.task.map((task, index) => (
                      <input type='text'  value={task} key={index}/>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* {showModal && <Modal closeModal={closeModal} />} */}
      </div>
    </div>
  );
};

export default Card;


