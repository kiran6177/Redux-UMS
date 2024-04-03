import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CreateUser from '../Components/CreateUser/CreateUser'

function AdminCreateUserPage() {
  return (
    <>
    <Navbar type={'Admin'}/>
    <CreateUser/>
    </>
  )
}

export default AdminCreateUserPage
