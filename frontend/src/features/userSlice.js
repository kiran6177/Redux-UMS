import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Utils/axios";

export const register = createAsyncThunk('userRegister',async (userData,thunkAPI)=>{
    try{
    const response =  await axios.post('/signup',userData)
    return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const login = createAsyncThunk('userLogin',async (userData,thunkAPI)=>{
    try {
        const response = await axios.post('/login',userData)
        // localStorage.setItem('userToken',JSON.stringify(response.data.success.token))
        // localStorage.setItem('user',JSON.stringify(response.data.success.data))
        return response.data
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const profileUpload = createAsyncThunk('profile',async({userToken,formData},thunkAPI)=>{
    try {
         const response = await axios.post('/profileUpload',formData,{headers:{'Authorization':`Bearer ${userToken}`}})
        // localStorage.setItem('user',JSON.stringify(response.data.success))
         return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

// const userToken = JSON.parse(localStorage.getItem("userToken"));
// const user = JSON.parse(localStorage.getItem("user"));


const userAuthSlice = createSlice({
    name:'userAuth',
    initialState:{
        success:false,
        loading:false,
        // user:user ? user :null,
        // userToken:userToken ? userToken : null,
        user:null,
        userToken:null,
        error:''
    },
    reducers:{
        reset:(state)=>{
            state.error = ''
            state.loading = false
            state.success = false
        },
        tokenReset:(state)=>{
            state.userToken = null
            state.user = null
        }
    },
    extraReducers(builder){
        builder
        .addCase(register.fulfilled,(state)=>{
            state.loading = false;
            state.success = true
        })
        .addCase(register.pending,(state)=>{
            state.loading = true;
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.success.data
            state.userToken = action.payload.success.token
        })
        .addCase(login.pending,(state)=>{
            state.loading = true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        .addCase(profileUpload.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.success
            state.success = true
        })
        .addCase(profileUpload.pending,(state)=>{
            state.loading = true;
        })
        .addCase(profileUpload.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

const userAuthReducer = userAuthSlice.reducer;

export const {reset,tokenReset} = userAuthSlice.actions

export {
    userAuthReducer
}