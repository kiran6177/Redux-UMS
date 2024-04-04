import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router';
import { getUsers, resetAdmin } from '../../features/adminSlice';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [hide,setHide] = useState(true);
    const firstRender = useRef(true);
    const check = useRef(true);
    const [search,setSearch] = useState('');
    const [users,setUsers] = useState(null)

    const {adminToken,Asuccess,Aerror,adminData,userData} = useSelector((state)=>state.adminToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const obj = useLocation();
    

    useEffect(()=>{
        if(!adminToken){
            navigate('/admin/login')
        }else{
            if(check.current){
                dispatch(getUsers(adminToken));
            }
        }
        if(userData){
            if(check.current){
                console.log(check.current);
                check.current = false
                setUsers(userData)
            }
        }
        if(firstRender.current){
            dispatch(resetAdmin())
            firstRender.current = false
            return
        }
        if(Aerror){
            toast.error(Aerror)
        } 
        if(obj.state?.message){
            toast.info('Deleted Successfully.')
        }
    },[adminToken,Aerror,userData]) 

    const handleGetUser = ()=>{
        setHide(!hide)
    }

    const handleSearch = ()=>{
        console.log(search);
        const searchdata = userData.filter(user=>{
            if(user.name.toLowerCase().includes(search.toLowerCase())){
                return user
            }
            return null
        })
        setUsers(searchdata)
    }

  return (
    <div className='min-h-[100vh] h-[100%] bg-[#FFF8DF] flex flex-col justify-start items-center md:flex-row md:items-start md:justify-between pt-[4rem]'>
        <div className='flex text-[#FFF8DF] md:hidden w-[100%] items-center justify-evenly bg-[#000720]  border-t-2 border-[#FFF8DF] h-[3rem]'>
            <Link to={'/admin/createuser'}  className='cursor-pointer'>Create User</Link>
        </div>
        <div className='hidden md:flex flex-col text-[#FFF8DF] text-xl items-start gap-10 pl-[2rem] pt-[3rem]  w-[20%] bg-[#000720]  fixed h-[100vh]'>
            <Link to={'/admin/createuser'} className='cursor-pointer'>Create User</Link>
        </div>
        <div className='w-[90%]  md:w-[60%] flex flex-col justify-center items-center md:ml-[16rem] lg:ml-[21rem] xl:ml-[30rem] my-[8rem] rounded-md py-8 px-16 shadow-xl '>
            <h2 className='font-semibold text-2xl md:text-4xl  text-center mt-8 mb-8'>Welcome Admin</h2>
            <div className='h-[250px] w-[250px] flex justify-center rounded-full overflow-hidden border-2 border-[#000720]'>
                <img src={adminData && adminData.image} className='h-[100%] object-cover' alt="" />
            </div>
            <Toaster richColors />
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Name : {adminData && adminData.name}</h5>
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Email : {adminData && adminData.email}</h5>
            <h5 className='text-2xl my-4 text-left w-[90%] md:w-[50%]'>Phone :  {adminData && adminData.mobile}</h5>
            <button onClick={handleGetUser} className='bg-[#000720] px-8 py-2 border-2 border-[#000720] text-[#FFF8DF] rounded-md'>{hide ? 'View Users' : 'Hide Users'}</button>

            <div className={hide ?'overflow-hidden opacity-0 h-0 transition-all duration-100 ease-in' :'block w-[100%] h-auto my-8 transition-all duration-500 ease-linear'}>
                <div className='my-4 flex gap-4'><input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search for users.' className='border-2 border-[#000720] py-2 w-[40%] px-4 rounded-md bg-[#FFF8DF]' /><button onClick={handleSearch} className='py-2 px-6 bg-[#000720] rounded-md text-[#FFF8DF]'>Search</button></div>
                <table className='hidden lg:table  w-[100%] rounded-sm border-2 border-[#000720] '>
                    <thead>
                    <tr key="heading" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Mobile</th>
                    <th>Age</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                   {users && users.map(user=>{
                        return(
                            <tr key={user.id} className='h-[3rem]'>
                                <td className='text-center'>{user.name}</td>
                                <td className='text-center'>{user.email}</td>
                                <td className='text-center'>{user.mobile}</td>
                                <td className='text-center'>{user.age}</td>
                                <td className='text-center '>
                                <button onClick={()=>navigate(`/admin/edituser?id=${user.id}`)}  className='border-2 border-[#000720] rounded-md bg-[#000720] text-[#FFF8DF] px-6 py-1'>View</button></td>
                            </tr>
                        )
                   }) 
                    }
                    </tbody>
                </table>
                <table className='table lg:hidden w-[100%] rounded-sm border-2 border-[#000720] '>
                    {users && users.map(user=>{
                        return(
                        <tbody key={user.id}>
                    <tr key="name" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Name</th>
                    <td className='text-center text-wrap'>{user.name}</td>
                    </tr>
                    <tr key="email" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Email</th>
                    <td className='text-center text-wrap'>{user.email}</td>
                    </tr>
                    <tr key="mobile" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Mobile</th>
                    <td className='text-center text-wrap'>{user.mobile}</td>
                    </tr>
                    <tr key="mobile" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Age</th>
                    <td className='text-center text-wrap'>{user.age}</td>
                    </tr>
                    <tr key="action" className='h-[4rem] border-b-2 border-[#000720]'>
                    <th>Action</th>
                    <td className='text-center flex flex-col sm:flex-row items-center justify-center my-2 gap-2 '><button onClick={()=>navigate(`/admin/edituser?id=${user.id}`)}  className='border-2 border-[#000720] rounded-md bg-[#000720] text-[#FFF8DF] px-6 py-1'>View</button></td>
                    </tr>
                    </tbody>)
                   }) 
                    }
                </table>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard
