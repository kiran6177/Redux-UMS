import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Toaster,toast} from 'sonner';
import { login as adminLogin  }  from '../../features/adminSlice';
import { login ,reset} from '../../features/userSlice';
import SyncLoader from 'react-spinners/SyncLoader'

function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {error,loading,userToken} = useSelector((state)=>state.userToken);
    const {Aerror,Aloading,adminToken,message} = useSelector((state)=>state.adminToken);

    const dispatch = useDispatch()

    const override = {
        display:'flex',
        justifyContent:'center'
    }

    const navigate = useNavigate();
    const signedObj = useLocation()

    useLayoutEffect(()=>{
        dispatch(reset())
    },[dispatch])


    useEffect(()=>{
        if(userToken){
            navigate('/')
        }
        if(adminToken){
            navigate('/admin')
        }
        if(props.type === 'Admin'){

        }else{
            if(signedObj && signedObj.state && signedObj.state.data){   
                toast.success(signedObj.state.data)
                signedObj.state.data = null
            }
        }
        if(error){
            toast.error(error)
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
        }
        if(Aerror){
            toast.error(Aerror);
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
        }
        if(message === 'Logout'){
            toast.success('Logout Successfully.')
        }

    },[userToken,adminToken,Aerror,error,signedObj,props,message])

    const handleClick = async (e)=>{
        try{
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
        if(!email.trim().length ||!password.trim().length ){
            toast.error('Fill all the fields.')
        }else if(!emailRegex.test(email)){
            toast.error('Enter a valid E-mail.')
        }else if(password.trim().length < 8){
            toast.error('Password needs atleast 8 characters.')
        }else if(!passwordRegex.test(password)){
            toast.error('Password needs alphabets and digits.')
        }
        else{
            if(props.type === 'Admin'){
                dispatch(adminLogin({email,password}))
            }else{
                dispatch(login({email,password}))
            }
        }
        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className='min-h-[100vh] h-[100%] bg-[#FFF8DF] flex items-center justify-center pt-[4rem]'>
        <div className='w-[90%] lg:w-[40%] border-2 border-[#000720] rounded-md p-8 shadow-xl '>
            <Toaster richColors/>
            <form onSubmit={handleClick}>
            <h2 className='font-semibold text-4xl text-center mt-2 mb-8'>{props.type} Login</h2>
            <div className='my-8'>
                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <button type='submit' className='w-[100%] border-2 border-[#000720] bg-[#000720] py-2 text-[#FFF8DF] rounded-md tracking-widest font-semibold transition-all duration-200 hover:bg-transparent hover:text-[#000720]'>LOGIN</button>
                {!props.type && <div className='flex justify-center w-[100%] gap-1 my-4'>Don't have an account ? <Link to={'/signup'} className='underline'>Create Account</Link></div>}
                <SyncLoader cssOverride={override} loading={loading}/> 
                <SyncLoader cssOverride={override} loading={Aloading}/> 
            </div>
            </form>
        </div>
    </div>
  ) 
}

export default Login
