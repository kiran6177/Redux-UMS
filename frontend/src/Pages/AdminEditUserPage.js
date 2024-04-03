import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import EditUser from '../Components/EditUser/EditUser'

function AdminEditUserPage() {
  return (
    <>
    <Navbar type={'Admin'} />
    <EditUser/>
    </>
  )
}

export default AdminEditUserPage
