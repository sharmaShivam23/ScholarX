import React from 'react'
import ProfilePage from '../components/ProfileCore/ProfilePage'
import Sidebar from '../components/ProfileCore/Sidebar'
import Logout from './Logout'
import { useSelector } from 'react-redux'

const Profile = () => {
 
  return (
    <div className='mt-12 p-0'>
      <ProfilePage/>
       
    </div>
  )
}

export default Profile
