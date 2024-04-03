import {combineReducers} from '@reduxjs/toolkit'
import { adminReducer } from './adminSlice'
import { userAuthReducer } from './userSlice'

const rootReducer = combineReducers({
    userToken:userAuthReducer,
    adminToken:adminReducer
})

export default rootReducer
