import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../Utils/axios'

export const login = createAsyncThunk('adminLogin',async({email,password},thunkAPI)=>{
    try {
        const response = await axios.post('/admin/login',{email,password})
        localStorage.setItem('adminToken',JSON.stringify(response.data.token))
        localStorage.setItem('adminData',JSON.stringify(response.data.adminData))
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const getUsers = createAsyncThunk('adminUsers',async(token,thunkAPI)=>{
    try {
        const response = await axios.get('/admin/getusers',{headers:{'Authorization':`Bearer ${token}`}})
        localStorage.setItem('userData',JSON.stringify(response.data.userData))
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const edituser = createAsyncThunk('adminEditUser',async ({adminToken,formdata},thunkAPI)=>{
    try {
        const response = await axios.put('/admin/edituser',formdata,{headers:{'Authorization':`Bearer ${adminToken}`,'Content-Type':'multipart/form-data'}})
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const blockUnblockUser = createAsyncThunk('adminblockUnblock',async({adminToken,userid},thunkAPI)=>{
    try {
        const response = await axios.get(`/admin/blockunblock?id=${userid}`,{headers:{'Authorization':`Bearer ${adminToken}`}})
        const userData = JSON.parse(localStorage.getItem("userData"));
        const newUserData = userData.map((user)=>{
            if(user.id === userid){
                return {
                    ...user,
                    isBlocked:response.data.message
                }
            }
            return user
        })
        localStorage.setItem("userData",JSON.stringify(newUserData));
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const deleteUser = createAsyncThunk('adminDeleteUser',async({adminToken,userid},thunkAPI)=>{
    try {
        const response = await axios.get(`/admin/delete?id=${userid}`,{headers:{"Authorization":`Bearer ${adminToken}`}})
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const createUser = createAsyncThunk('adminCreateUser',async({adminToken,user},thunkAPI)=>{
    try {
        const response = await axios.post('/admin/create',user,{headers:{'Authorization':`Bearer ${adminToken}`}})
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

const admin = JSON.parse(localStorage.getItem("adminToken"));
const adminData = JSON.parse(localStorage.getItem("adminData"));
const userData = JSON.parse(localStorage.getItem("userData"));

 
const adminSlice = createSlice({
    name:'adminAuth',
    initialState:{
        Aloading:false,
        Asuccess:false,
        Aerror:'',
        adminToken:admin ? admin :null,
        adminData:adminData ? adminData :null,
        userData:userData ? userData :null,
        message :''
    },
    reducers:{
        resetAdmin:(state)=>{
            state.Aerror = ''
            state.Aloading = false
            state.Asuccess = false
            state.message = ''
        },
        logout:(state)=>{
            state.Aerror = ''
            state.Aloading = false
            state.Asuccess = false
            state.message = 'Logout'
            state.adminData = null
            state.userData = null
            state.adminToken = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            state.Aloading = false
            state.Asuccess = true
            state.adminToken = action.payload.token
            state.adminData = action.payload.adminData
        })
        .addCase(login.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(login.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.Aloading = false
            state.Asuccess = true
            state.userData = action.payload.userData
        })
        .addCase(getUsers.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
        .addCase(edituser.fulfilled,(state,action)=>{
            const index = state.userData.findIndex((user)=>user.id === action.payload.user.id)
            state.userData[index] = action.payload.user
            state.Aloading = false
            state.Asuccess = true
        })
        .addCase(edituser.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(edituser.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
        .addCase(blockUnblockUser.fulfilled,(state,action)=>{
            const index = state.userData.findIndex((user)=>user.id === action.payload.id)
            state.userData[index].isBlocked = action.payload.message
            if(action.payload.message){
                state.message = 'Blocked'
            }else{
                state.message = 'Unblocked'
            }
            state.Aloading = false
        })
        .addCase(blockUnblockUser.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(blockUnblockUser.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload.message === 'Deleted'){
                state.message = action.payload.message
            }else if(action.payload.message && action.payload.message !== 'Deleted'){
                state.message = 'Blocked'
            }else{
                state.message = 'Unblocked'
            }
            state.Aloading = false
            state.userData = state.userData.filter((user)=>user.id !== action.payload.id)
        })
        .addCase(deleteUser.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            console.log(action);
            state.message = 'Created'
            state.Aloading = false
            state.userData.push(action.payload.user)
        })
        .addCase(createUser.pending,(state)=>{
            state.Aloading = true
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.Aloading = false
            state.Aerror = action.payload
        })
    }
})

export const {resetAdmin,logout} = adminSlice.actions

export const adminReducer = adminSlice.reducer 