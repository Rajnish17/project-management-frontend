import React from 'react'
import "./dashboard.css"
import Sidebar from '../Components/Sidebar/Sidebar'
import Analytics from '../Components/Analatics/Analytics'


const AnalyticsPage = () => {

  return (
    <div className='dashboard-page'>
      <Sidebar />
      <Analytics />
    </div>
  )
}

export default AnalyticsPage