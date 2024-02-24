import React from 'react'
import "./dashboard.css"
import Sidebar from '../Components/Sidebar/Sidebar'
import Setting from '../Components/Settings/Setting'
import { Navigate } from 'react-router-dom';

const SettingsPage = () => {
    const token = localStorage.getItem("token");


  if (!token) {
    return <Navigate to="/" />;
  }
    return (
        <div className='dashboard-page' >
            <Sidebar />
            <Setting />

        </div>
    )
}

export default SettingsPage