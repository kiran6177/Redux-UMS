import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AdminDashboard from '../Components/AdminDashboard/AdminDashboard'

function AdminDashboardPage() {
  return (
    <>
    <Navbar type={'Admin'} />
    <AdminDashboard/>
    </>
  )
}

export default AdminDashboardPage
