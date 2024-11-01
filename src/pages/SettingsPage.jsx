import React from 'react'
import "./dashboard.css"
import Sidebar from '../Components/Sidebar/Sidebar'
import Setting from '../Components/Settings/Setting'


const SettingsPage = () => {
  return (
    <div className='dashboard-page' >
      <Sidebar />
      <Setting />

    </div>
  )
}

export default SettingsPage