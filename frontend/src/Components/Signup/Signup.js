import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register,reset } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';
import SyncLoader from 'react-spinners/SyncLoader';

function Signup() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const {success,loading,userToken,error} = useSelector((state)=>state.userToken)

    const override = {
        display:'flex',
        justifyContent:'center'
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(password !== cpassword){
            toast.error('Password Mismatch')
        }
        else{
            const userData = {name,email,mobile,password,cpassword}
            dispatch(register(userData))
        }
    }

    useEffect(()=>{
        if(success){
            navigate('/login',{replace:true,state:{data:"Registered Successfully!!"}})
        }
        if(userToken){
            navigate('/',{replace:true})
        }
        dispatch(reset())
    },[success,userToken,navigate,dispatch])

  return (
    <div className='min-h-[91.8vh] h-[100%] bg-[#FFF8DF] flex items-center justify-center pt-[4rem]'>
        <div className='w-[90%] lg:w-[40%] border-2 border-[#000720] rounded-md p-8 my-8 shadow-xl '>
            <h2 className='font-semibold text-4xl text-center mt-2 mb-8'>Signup</h2>
            <Toaster richColors/>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='my-8'>
                <label>Name</label>
                <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <label>Mobile</label>
                <input type="number" name='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                <label>Confirm Password</label>
                <input type="password" name='cpassword' value={cpassword} onChange={(e)=>setCpassword(e.target.value)} className='w-[100%] p-2 border-2 border-[#000720] rounded-md bg-[#FFF8DF]' />
            </div>
            <div className='my-8'>
                {error && <p className='text-red-500'>{error}</p>}
                <button type='submit' className='w-[100%] border-2 border-[#000720] bg-[#000720] py-2 text-[#FFF8DF] rounded-md tracking-widest font-semibold transition-all duration-200 hover:bg-transparent hover:text-[#000720]'>SIGNUP</button>
                <div className='flex justify-center w-[100%] gap-1 my-4'>Already have an account ? <Link to={'/login'} className='underline'>Login</Link></div>
                <SyncLoader cssOverride={override} loading={loading}/> 
            </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
