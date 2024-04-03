import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { reset } from '../../features/userSlice';

function UserHome() {

  const {userToken,user} = useSelector((state)=>state.userToken)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!userToken){
      navigate('/login')
    }
    dispatch(reset());
  },[userToken,dispatch,navigate])
  return (
    <div className='min-h-[100vh] h-[100%] bg-[#FFF8DF] flex items-start justify-center pt-[8rem]'>
        <div className='w-[90%] flex flex-col justify-center items-center  rounded-md py-8 px-16 shadow-xl '>
            <h2 className='font-semibold text-2xl md:text-4xl  text-center mt-2 mb-8'>Welcome {user && user.name}</h2>
            <div className='h-[250px] w-[250px] flex justify-center rounded-full overflow-hidden border-2 border-[#000720]'>
                <img src={user && user.image} className='h-[100%] object-cover' alt="" />
            </div>
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Name : {user && user.name}</h5>
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Email : {user && user.email}</h5>
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Phone : {user && user.mobile}  </h5>
            <Link to={'/profile'} className='bg-[#000720] px-8 py-2 border-2 border-[#000720] text-[#FFF8DF] rounded-md'>Edit Profile</Link>
        </div>
    </div>
  )
}

export default UserHome
