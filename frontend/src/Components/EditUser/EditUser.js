import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster, toast } from 'sonner'
import { blockUnblockUser, deleteUser, resetAdmin } from '../../features/adminSlice';
import { edituser } from '../../features/adminSlice'

function EditUser() {
    const [newname,setNewName] = useState('');
    const [newemail,setNewEmail] = useState('');
    const [newmobile,setNewMobile] = useState('');
    const [isblocked,setIsblocked] = useState(false);
    const [image,setImage] = useState(null);
    const [imageurl,setImageURL] = useState(null);

    const refObj = useRef();
    const firstRender = useRef(true);
    const {adminToken,Asuccess,Aerror,Aloading,userData,message} = useSelector((state)=>state.adminToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);



    useEffect(()=>{

        if(!adminToken){
            navigate('/admin/login')
        }else{
            const userid = searchParams.get('id');
            const index = userData.findIndex((user)=>user.id === userid);
            console.log(index);
            if(index === -1){
                if(message === 'Deleted'){
                    toast.info('Deleted Successfully.')
                }
                setTimeout(()=>{
                    navigate('/admin')
                },2000)
            }else{
                setNewName(userData[index].name)
                setNewEmail(userData[index].email)
                setNewMobile(userData[index].mobile)
                setImageURL(userData[index].image)
                setIsblocked(userData[index].isBlocked)
            }
        }
        if(Aerror){
            toast.error(Aerror)
            setTimeout(()=>{
                navigate('/admin')
            },2000)
        }
        if(firstRender.current){
            dispatch(resetAdmin())
            firstRender.current = false
            return
        }
        if(Asuccess){
            toast.success("User Updated Successfully.")
            setTimeout(()=>{
                navigate('/admin')
            },2000)
        }
        if(message === 'Blocked'){
            toast.warning('Blocked Successfully!!')
        }
        if(message === 'Unblocked'){
            toast.info('Unblocked Successfully.')
        }

    },[adminToken,userData,Aerror,Asuccess,message])

    const override = {
        display:'flex',
        justifyContent:'center',
        marginTop:'1rem'
    }

    const handleChange = ()=>{
        setImage(refObj.current.files[0])
        setImageURL(URL.createObjectURL(refObj.current.files[0]))
    }

    const handleUpload = ()=>{
        const userid = searchParams.get('id');
        const formdata = new FormData();
        formdata.append('id',userid)
        formdata.append('name',newname);
        formdata.append('email',newemail);
        formdata.append('mobile',newmobile);
        if(image){
            formdata.append('image',image)
        }
        dispatch(edituser({adminToken,formdata}))
    }

    const handleClick = ()=>{
        refObj.current.click()
    }

    const handleBlocking = ()=>{
        const userid = searchParams.get('id');
        dispatch(blockUnblockUser({adminToken,userid}))
    }

    const handleDelete = ()=>{
        const userid = searchParams.get('id');
        dispatch(deleteUser({adminToken,userid}))

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
            <div className='flex w-[90%] md:w-[40%] mt-10 mb-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Name : </h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newname} onChange={(e)=>{ setNewName(e.target.value)}} /></div>
            <div className='flex w-[90%] md:w-[40%] my-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Email : </h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newemail} onChange={(e)=>{ setNewEmail(e.target.value)}} /></div>
            <div className='flex w-[90%] md:w-[40%] my-2'><h5 className='text-2xl my-4 text-left w-[20%]'>Phone :</h5><input className='w-[80%] border-2 border-[#000720] rounded-md px-6' type="text" value={newmobile} onChange={(e)=>{ setNewMobile(e.target.value)}}  /></div>
            <div className='flex gap-4 mt-6'>
            {isblocked ? <button onClick={handleBlocking}  className='border-2 border-[#000720] rounded-md bg-[#000720] text-[#FFF8DF] px-8 py-2'>Unblock</button> :<button onClick={handleBlocking} className='border-2 border-[#000720] rounded-md bg-[#000720] text-[#FFF8DF] px-8 py-2'>Block</button> }
            <button onClick={handleDelete} className='border-2 border-[#000720] rounded-md bg-[#000720] text-[#FFF8DF] px-8 py-2'>Delete</button>
            </div>
            <button onClick={handleUpload}  className={'border-2 border-[#000720] px-8 py-2 text-[#000720] mt-10 transition-all duration-400 hover:scale-105'}>Save Changes</button>
            <SyncLoader cssOverride={override} loading={Aloading}/> 
        </div>
    </div>
  )
}

export default EditUser
