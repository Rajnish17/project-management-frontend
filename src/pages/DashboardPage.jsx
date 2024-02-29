import React from 'react';
import "./dashboard.css"
import Sidebar from "../Components/Sidebar/Sidebar"
import Dashboard from '../Components/Dashboard/Dashboard'
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className='dashboard-page' >
        <Sidebar />
        <Dashboard />

      </div>
    </>
  )
}

export default DashboardPage