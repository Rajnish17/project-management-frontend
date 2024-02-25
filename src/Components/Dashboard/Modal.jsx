import React, { useState } from 'react';
import './modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseUrl from "../api";

const Modal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddTask = () => {

    console.log(title, task, priority, dueDate);
  };

  const handleSave = async () => {
    try {

      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json' // Assuming your API expects JSON data
        }
      };
      
      const data = {
        title,
        task,
        priority,
        dueDate
      };

      const response = await axios.post(`${baseUrl}/todo/add`, data, config);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal rtl">
        <button className="close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <h2>Add Item</h2>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="priority-group">
          <label>Priority:</label>
          <div className="priority-buttons">
            <div>low
              <input type="radio" name="priority" value="low" onChange={handlePriorityChange} />
            </div>
            <div>medium
              <input type="radio" name="priority" value="moderate" onChange={handlePriorityChange} />
            </div>
            <div>high
              <input type="radio" name="priority" value="high" onChange={handlePriorityChange} />
            </div>
          </div>
        </div>

        <div className="add-button">
          <div className="task-group">
            <label>Task</label>
            <input type="text" value={task} onChange={handleTaskChange} />
          </div>
          <div onClick={handleAddTask}>
            <FontAwesomeIcon icon={faPlus} /> Add New
          </div>
        </div>

        <div className="last-container">
          <div className="last-group">
            <label>Due Date:</label>
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </div>
          <div className="cancel-button" onClick={closeModal}>Cancel</div>
          <div className="save-button" onClick={handleSave}>Save</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
