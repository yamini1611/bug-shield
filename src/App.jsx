import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import './App.css';
import Navbarjsx from './Components/Navbar/Navbar';
import Home from './Components/User/User';
import RaiseIssue from './Components/RaiseIssue/RaiseIssue';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { ToastContainer } from 'react-toastify';
import UnAuthorized from './Components/Authorization/UnAuthorized';
import ProtectedRoute from './Components/Authorization/ProtectedRoute';
import Userdetails from './Components/Userdetails/Userdeatils';

function App() {

  const loggedUserName=localStorage.getItem('userName')
  return (
    <BrowserRouter >
      <div className="App">
        <Navbarjsx />
        <Routes>
        {loggedUserName }
          <Route path="/" element={<Home />} />
          <Route path="/RaiseIssue" element={<RaiseIssue />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
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
