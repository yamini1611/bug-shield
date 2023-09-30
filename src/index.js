import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; 
import rootReducer from './Components/Redux/reducer';
import thunk from 'redux-thunk'; 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
