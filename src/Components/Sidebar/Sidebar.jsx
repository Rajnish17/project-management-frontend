import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout'; // Import the LogoutModal component

const Sidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="sidebar bg-gray-900 text-gray-200 w-64 h-screen flex flex-col justify-between p-6">
      <div className="head text-3xl font-semibold text-center mb-6 tracking-wider">
        ProManage
      </div>

      <ul className="nav space-y-4">
        <Link to={"/dashboard"} className="nav-item flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-md transition duration-300">
          <FontAwesomeIcon icon={faTable} className="icon text-xl" />
          <span className="text-lg">Board</span>
        </Link>

        <Link to={"/analytics"} className="nav-item flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-md transition duration-300">
          <FontAwesomeIcon icon={faChartBar} className="icon text-xl" />
          <span className="text-lg">Analytics</span>
        </Link>

        <Link to={"/settings"} className="nav-item flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-md transition duration-300">
          <FontAwesomeIcon icon={faCog} className="icon text-xl" />
          <span className="text-lg">Settings</span>
        </Link>
      </ul>

      <div
        className="logout mt-8 flex items-center justify-center space-x-3 p-3 cursor-pointer bg-red-600 rounded-md transition duration-300 hover:bg-red-700"
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="icon text-xl" />
        <span className="text-lg">Logout</span>
      </div>

      {showModal && (
        <Logout
          onConfirmLogout={handleLogout}
          onClose={toggleModal}
        />
      )}
    </div>



  );
};

export default Sidebar;
