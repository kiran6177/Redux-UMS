import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Login from '../Components/Login/Login'

function AdminLoginPage() {
  return (
    <>
    <Navbar type={'Admin'} />
    <Login type={'Admin'} />
    </>
  )
}

export default AdminLoginPage
