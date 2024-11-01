import React from 'react';
import Sidebar from "../Components/Sidebar/Sidebar"
import Dashboard from '../Components/Dashboard/Dashboard'


const DashboardPage = () => {

  return (
    <>
      <div className='flex' >
        <Sidebar />
        <Dashboard />
      </div>
    </>
  )
}

export default DashboardPage