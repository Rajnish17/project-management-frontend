import React from 'react';
import "./dashboard.css"
import Sidebar from "../Components/Sidebar/Sidebar"
import Dashboard from '../Components/Dashboard/Dashboard'


const DashboardPage = () => {

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