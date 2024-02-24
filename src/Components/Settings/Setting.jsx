import React, { useState } from 'react';
import './setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import baseUrl from "../api"
import axios from "axios"

const Setting = () => {
  const [fullName, setfullName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');

  const toggleShowPassword = (field) => {
    if (field === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    const userId = localStorage.getItem('userId');

    try {
      // Prepare data to be sent based on fields filled by the user
      const data = {};
      if (fullName.trim()) {
        data.fullName = fullName;
      }
      if (newPassword.trim()) {
        data.oldPassword = oldPassword; // Send old password
        data.newPassword = newPassword;
      }

      // If no fields are filled, show an error message
      if (Object.keys(data).length === 0) {
        setMessage('Please provide at least one field to update.');
        return;
      }

      // Send the request with updated data
      const response = await axios.put(`${baseUrl}/user/update/${userId}`, data);
      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="input-group">

        <div className="input-icon">

          <input
            type="text"
            id="name"
            placeholder="Name"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </div>

      </div>

      <div className="input-group">

        <div className="input-icon">
          <input
            type={showOldPassword ? 'text' : 'password'}
            id="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showOldPassword ? faEyeSlash : faEye}
            onClick={() => toggleShowPassword('old')}
            className="password-icon"
          />
        </div>
      </div>

      <div className="input-group">

        <div className="input-icon">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showNewPassword ? faEyeSlash : faEye}
            onClick={() => toggleShowPassword('new')}
            className="password-icon"
          />
        </div>

      </div>
      {message && <p>{message}</p>}
      <button className="update-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Setting;
