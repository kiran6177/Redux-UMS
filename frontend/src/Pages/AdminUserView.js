import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import UserView from '../Components/UserView/UserView'

function AdminUserView() {
  return (
    <>
    <Navbar type={'Admin'}/>
    <UserView/>
    </>
  )
}

export default AdminUserView
