import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './authReducer';
import { persistStore } from 'redux-persist'; 

const rootReducer = {
  auth: persistedReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store); 

export default store;
