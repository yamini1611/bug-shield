import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import './App.css';
import Navbarjsx from './Components/Navbar/Navbar';
import Home from './Components/User/User';
import RaiseIssue from './Components/RaiseIssue/RaiseIssue';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { ToastContainer } from 'react-toastify';
import UnAuthorized from './Components/Authorization/UnAuthorized';
import Userdetails from './Components/Userdetails/Userdetails';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './Components/Redux/authActions';
import { useSelector } from 'react-redux';
import RaisedQueries from './Components/RaisedQueries/RaisedQueries';

function App() {
  const dispatch = useDispatch();
  const roleId = useSelector((state) => state.auth.roleId);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(loginSuccess(token, roleId));
    }
  }, [dispatch ,roleId] );
  return (
    <BrowserRouter >
      <div className="App">
        <Navbarjsx />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RaiseIssue" element={<RaiseIssue />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/Userdetails" element={<Userdetails/>} />
          <Route path="/RaisedQueries" element={<RaisedQueries/>} />


          {/* <ProtectedRoute path="/admin" element={<Userdetails/>} allowedRoles={['Admin']} /> */}
          {/* <ProtectedRoute path="/sa-team" element={<SaTeamComponent />} allowedRoles={['Admin', 'SA Team']} />
          <ProtectedRoute path="/users" element={<UsersComponent />} allowedRoles={['Admin', 'SA Team', 'Users']} /> */}
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}


export default App;
