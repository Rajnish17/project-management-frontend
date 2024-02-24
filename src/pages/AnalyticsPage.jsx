import React from 'react'
import "./dashboard.css"
import Sidebar from '../Components/Sidebar/Sidebar'
import Analytics from '../Components/Analatics/Analytics'
import { Navigate } from 'react-router-dom';

const AnalyticsPage = () => {
  const token = localStorage.getItem("token");


  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <div className='dashboard-page'>
        <Sidebar/>
        <Analytics/>
    </div>
  )
}

export default AnalyticsPage