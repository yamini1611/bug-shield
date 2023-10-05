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
import Userdetails from './Components/Userdetails/Userdetails';
import { useDispatch } from 'react-redux';
import { loginSuccess, initAllocatedQuery } from './Components/Redux/authActions'; 
import { useSelector } from 'react-redux';
import RaisedQueries from './Components/RaisedQueries/RaisedQueries';
import AllotedQueries from './Components/AllotedQuery/AllotedQuery';
import { Computer } from '@mui/icons-material';
import ComputerInfo from './Components/ComputerInfo/ComputerInfo';
import Footer from './Components/Footer/Footer';
import RaisedQueriesUser from './Components/RaisedQueryUser/RaisedQueryuser';

function App() {
  const dispatch = useDispatch();
  const roleId = useSelector((state) => state.auth.roleId);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(loginSuccess(token, roleId));

      if (roleId === 'SA Team') {
        dispatch(initAllocatedQuery(null)); 
      }
    }
  }, [dispatch, roleId]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbarjsx />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path='/Raisedquerybyuser' element={<RaisedQueriesUser />}></Route>
          <Route path="/RaiseIssue" element={<RaiseIssue />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Userdetails" element={<Userdetails/>} />
          <Route path="/RaisedQueries" element={<RaisedQueries/>} />
          <Route path='/SATeamDashboard' element={<AllotedQueries/>}/>
          <Route path='/ComputerInfo' element={<ComputerInfo />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
