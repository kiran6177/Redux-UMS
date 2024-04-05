import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { profileUpload, reset, tokenReset } from '../../features/userSlice';
import { Toaster, toast } from 'sonner';
import SyncLoader from 'react-spinners/SyncLoader';

function UserProfile() {
    const [newname,setNewName] = useState('');
    const [newemail,setNewEmail] = useState('');
    const [newmobile,setNewMobile] = useState('');
    const [newage,setNewAge] = useState('');
    const [hide,setHide] = useState(true)

    const [image,setImage] = useState(null);
    const [imageurl,setImageURL] = useState(null);

    const refObj = useRef();

    const override = {
        display:'flex',
        justifyContent:'center',
        marginTop:'1rem'
    }

    const handleClick = ()=>{
        refObj.current.click()
    }

    const handleChange = ()=>{
        setHide(false)
        if(refObj.current.files[0]){
            setImage(refObj.current.files[0]);
            setImageURL(URL.createObjectURL(refObj.current.files[0]))
        }
    }

    const {userToken,user,success,error,loading} = useSelector((state)=>state.userToken)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!userToken || !user){
            navigate('/login')
        }
        if(success){
            setHide(true);
            toast.success('Profile Updated Succesfully.')
        }
        if(user){
            setNewName(user.name)
            setNewEmail(user.email)
            setNewMobile(user.mobile)
            setNewAge(user.age)
            setImageURL(user.image)
        }
        if(error){
            if(error==="Unauthorized"){
                toast.error('Session timeout!! Please Login Again.')
                setTimeout(()=>{
                    dispatch(tokenReset())
                    // localStorage.removeItem('userToken');
                    // localStorage.removeItem('user');
                    navigate('/login',{replace:true})
                },2000)
            }else{
                toast.error('You are temporarily suspended. Please contact officials.');
                setTimeout(()=>{
                    dispatch(tokenReset());
                    // localStorage.removeItem('userToken');
                    // localStorage.removeItem('user');
                    navigate('/login',{replace:true})
                },2000)
            }
        }
        dispatch(reset())
    },[userToken,user,dispatch,navigate,success,error])

    const handleUpload = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(newname,newemail,newmobile,newage);
        if(!newname.trim().length || !newemail.trim().length || !newmobile.trim().length || !newage.toString().trim().length){
            toast.error('Fill all the fields.')
        }else if(!emailRegex.test(newemail)){
            toast.error('Enter a valid E-mail.')
        }else if(newmobile.trim().length !== 10){
            toast.error('Enter valid mobile number.')
        }else if(!imageurl){
            toast.error('Please choose a profile picture.')
        }else{
            const formData = new FormData()
            formData.append('image',image)
            formData.append('name',newname)
            formData.append('email',newemail)
            formData.append('mobile',newmobile)
            formData.append('age',newage)
            dispatch(profileUpload({userToken,formData}))
        }
    }

  return (
    <div className='min-h-[100vh] h-[100%] bg-[#FFF8DF] flex items-start justify-center pt-[8rem]'>
        <div className=' w-[90%] flex flex-col justify-center items-center  rounded-md py-8 px-16 shadow-xl '>
            <h2 className='font-semibold text-2xl md:text-4xl  text-center mt-2 mb-8'>Edit Profile</h2>
            <Toaster richColors />
            <div className='relative'>
            <div className=' h-[250px] w-[250px] flex justify-center rounded-full overflow-hidden border-2 border-[#000720]'>
                <img src={imageurl && imageurl} className='h-[100%] object-cover' alt="" />
            </div>
            <input type="file" style={{display:'none'}} ref={refObj} onChange={handleChange} />
            <div className='absolute bottom-2 text-2xl right-5'><i className="fa-solid fa-file-circle-plus cursor-pointer" onClick={handleClick}></i></div>
            </div>
            <div className='flex w-[90%] md:w-[40%] mt-10 mb-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Name : </h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newname} onChange={(e)=>{setHide(false); setNewName(e.target.value)}} /></div>
            <div className='flex w-[90%] md:w-[40%] my-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Email : </h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newemail} onChange={(e)=>{setHide(false); setNewEmail(e.target.value)}} /></div>
            <div className='flex w-[90%] md:w-[40%] my-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Phone :</h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newmobile} onChange={(e)=>{setHide(false); setNewMobile(e.target.value)}}  /></div>
            <div className='flex w-[90%] md:w-[40%] my-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Age :</h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newage} onChange={(e)=>{setHide(false); setNewAge(e.target.value)}}  /></div>
            <button onClick={handleUpload}  className={hide ? 'hidden' :'border-2 border-[#000720] px-8 py-2 text-[#000720] mt-10'}>Save Changes</button>
            <SyncLoader cssOverride={override} loading={loading}/> 
        </div>
    </div>
  )
}

export default UserProfile
