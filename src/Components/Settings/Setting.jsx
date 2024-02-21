// Settings.js

import React, { useState } from 'react';
import './setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Setting = () => {
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowPassword = (field) => {
    if (field === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    }
  };

  const handleUpdate = () => {
    // Logic for updating settings goes here
    console.log('Settings updated:', { name, oldPassword, newPassword });
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      <button className="update-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Setting;
