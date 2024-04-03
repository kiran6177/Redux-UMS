import {configureStore} from '@reduxjs/toolkit';
import { userAuthReducer } from '../features/userSlice';
import { adminReducer } from '../features/adminSlice';

const store = configureStore({
    reducer:{
        userToken:userAuthReducer,
        adminToken:adminReducer
    }
})

export default store