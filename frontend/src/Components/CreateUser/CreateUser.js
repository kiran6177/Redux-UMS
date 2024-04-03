import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster, toast } from 'sonner'
import { createUser, resetAdmin } from '../../features/adminSlice';

function CreateUser() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');

    const {Aloading,Asuccess,Aerror,adminToken,message} = useSelector((state)=>state.adminToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!adminToken){
            navigate('/admin/login')
        }else{
            dispatch(resetAdmin())
        }
        if(message === 'Created'){
            toast.success('Created User Successfully.')
            setTimeout(()=>{
                navigate('/admin')
            },2000)
        }
        if(Aerror){
            toast.error(Aerror)
        }
    },[adminToken,message,Aerror])

    const override = {
        display:'flex',
        justifyContent:'center'
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(name.trim().length === 0 || email.trim().length === 0 || mobile.trim().length === 0 || password.trim().length === 0 ){
            toast.error('Fill all the fields.')
        }else{
            const user = {name,email,mobile,password}
            dispatch(createUser({adminToken,user}))
        }
    }

  return (
    <div className='min-h-[100vh] h-[100%] bg-[#FFF8DF] flex items-center justify-center pt-[4rem]'>
        <div className='w-[80%]  border-2 border-[#000720] rounded-md p-8 my-8 shadow-xl '>
            <h2 className='font-semibold text-4xl text-center mt-2 mb-8'>Create User</h2>
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
                {/* {Aerror && <p className='text-red-500'>{Aerror}</p>} */}
                <button type='submit' className='w-[100%] border-2 border-[#000720] bg-[#000720] py-2 text-[#FFF8DF] rounded-md tracking-widest font-semibold transition-all duration-200 hover:bg-transparent hover:text-[#000720]'>CREATE USER</button>
                <SyncLoader cssOverride={override} loading={Aloading}/> 
            </div>
            </form>
        </div>
    </div>
  )
}

export default CreateUser
