// Modal.js

import React, { useState } from 'react';
import './modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleAddItem = () => {
    if (title.trim() !== '') {
      setItems([...items, { title, priority }]);
      setTitle('');
      setPriority('Medium');
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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
          <input type="text" value={title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <div className="priority-buttons">
            <button
              className={priority === 'Low' ? 'selected' : ''}
              onClick={() => handlePriorityChange('Low')}
            >
              Low
            </button>
            <button
              className={priority === 'Medium' ? 'selected' : ''}
              onClick={() => handlePriorityChange('Medium')}
            >
              Medium
            </button>
            <button
              className={priority === 'High' ? 'selected' : ''}
              onClick={() => handlePriorityChange('High')}
            >
              High
            </button>
          </div>
        </div>
        
        <button className="add-button" onClick={handleAddItem}>Add New</button>

        <ul className="items-list">
          {items.map((item, index) => (
            <li key={index}>
              <input type="checkbox" />
              <input type='text' value={item.title} className="item-title"/>
              <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
             
            </li>
          ))}
        </ul>

        <div className="button-group">
          <button className="cancel-button" onClick={closeModal}>Cancel</button>
          <button className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
