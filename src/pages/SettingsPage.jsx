import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Setting from '../Components/Settings/Setting'


const SettingsPage = () => {
  return (
    <div className='flex ' >
      <Sidebar />
      <Setting />
    </div>
  )
}

export default SettingsPage