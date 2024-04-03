import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {logout} from '../../features/adminSlice'
import { tokenReset } from '../../features/userSlice';

function Navbar(props) {

  const {userToken,error} = useSelector((state)=>state.userToken);
  const {adminToken,Aerror} = useSelector((state)=>state.adminToken)
  const [token,setToken] = useState(null);

  const dispatch = useDispatch();

  useLayoutEffect(()=>{
    if(props.type === 'Admin'){
      setToken(adminToken)
    }else{
      setToken(userToken)
    }

  },[userToken,token,adminToken])

  const handleAdminLogout = ()=>{
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    localStorage.removeItem('userData');
    dispatch(logout())
  }

  const handleLogout = ()=>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    dispatch(tokenReset())
  }

  return (
    <div className='flex bg-[#000720] h-[4rem] text-[#FFF8DF] justify-between px-10 fixed w-[100%] z-10'>
        <div className='h-[100%] flex items-center w-[50%]'>
          <img src="/images/logo.png" className='h-[90%]' alt="" />
        </div>
        <div className='flex items-center justify-end gap-10 w-[50%] pe-10'>
          {token ? props.type === "Admin"? 
          <button onClick={handleAdminLogout}>Logout</button>
          :
          <button onClick={handleLogout}>Logout</button>
          :<>
          <NavLink to="/login">Login</NavLink>
          {props.type !== 'Admin' && <NavLink to="/signup">Signup</NavLink>}
          </>}
        </div>
    </div>
  )
}

export default Navbar
