import React from 'react';

const Logout = ({ onConfirmLogout, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="logout-modal bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl text-gray-700 font-semibold mb-4">Logout Confirmation</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirmLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
