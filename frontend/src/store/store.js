import {configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/rootReducer';
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PAUSE,PERSIST,REGISTER,REHYDRATE,PURGE,FLUSH } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[PAUSE,PERSIST,REGISTER,REHYDRATE,PURGE,FLUSH]
            }
        })
})
export const persistor = persistStore(store)
export default store

