import React, { useState } from 'react';
import './modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseUrl from "../api";

const Modal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

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
    setTasks([...tasks, '']);
  };

  const handleTaskChange = (index, e) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.target.value;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      // Check if dueDate is empty and set it to null
      const formattedDueDate = dueDate !== '' ? dueDate : null;

      const config = {
        headers: {
          'token': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const data = {
        title,
        task: tasks,
        priority,
        dueDate: formattedDueDate
      };

      const response = await axios.post(`${baseUrl}/todo/add`, data, config);
      closeModal();
      console.log(response);
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
          <select value={priority} onChange={handlePriorityChange}>
            <option value="Low">Low</option>
            <option value="moderate">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="task-group">
            <label>Task:</label>
            <input type="text" value={task} onChange={(e) => handleTaskChange(index, e)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteTask(index)} />
          </div>
        ))}

        <div className="add-button">
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
