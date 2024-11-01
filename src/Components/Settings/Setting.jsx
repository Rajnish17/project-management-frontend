import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import baseUrl from "../api";
import axios from "axios";

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
      setMessage(response.data.message);
      setfullName('');
      setNewPassword('');
      setOldPassword('');
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md md:ml-16 md:w-[38rem]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Settings</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
      </div>

      <div className="input-group mb-4 relative">
        <input
          type={showOldPassword ? 'text' : 'password'}
          id="oldPassword"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <FontAwesomeIcon
          icon={showOldPassword ? faEyeSlash : faEye}
          onClick={() => toggleShowPassword('old')}
          className="absolute right-3 top-3 cursor-pointer text-gray-600"
        />
      </div>

      <div className="input-group mb-6 relative">
        <input
          type={showNewPassword ? 'text' : 'password'}
          id="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <FontAwesomeIcon
          icon={showNewPassword ? faEyeSlash : faEye}
          onClick={() => toggleShowPassword('new')}
          className="absolute right-3 top-3 cursor-pointer text-gray-600"
        />
      </div>

      {message && <p className='text-red-600 mb-4 text-center'>{message}</p>}

      <button
        className="update-button w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default Setting;
