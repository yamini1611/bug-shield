import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  const encryptPassword = (password) => {
    return password.split('').reverse().join('');
  };
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const user = localStorage.getItem("roleId");
    return !!user;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

    const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:44365/api/Login/Users', {
        email: email,
        password: password,
      });
      if (response.status === 200 && response.data && response.data.roleid) {
        const roleId = response.data.roleid;
        const userToken = response.data.token;
        const userid = response.data.userid;
        const username = response.data.username;
        const encryptedPassword = encryptPassword(response.data.password);
        const email = response.data.email;
        const phone = response.data.phone;
        const computerid = response.data.computerid;
        console.log('user details', response.data);
        dispatch(loginSuccess(userToken, roleId ,userid)); 
        console.log(phone);
        
        localStorage.setItem('token', userToken);
        localStorage.setItem('userid' ,userid);
        localStorage.setItem('username' ,username);
        localStorage.setItem('email' ,email);
        localStorage.setItem('password', encryptedPassword); 
        localStorage.setItem('phone',phone);
        localStorage.setItem('computerid' ,computerid);
        Navigate('/');
        toast.success('Logged in Successfully!', {
          icon: <CheckCircleIcon />,
        });
      }
      
       else {
        setError('Invalid email or password');
      }    
    } catch (error) {
      console.error('API request failed:', error);
      setError('Invalid email or password');
    }
  };
  return (
<div className="container" id="reg">
      <section className="d-flex justify-content-center align-items-center">
        <div className="row">
          {/* Image column */}
          <div className="col-lg-7 d-none d-lg-block p-0">
            <img
src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=ais"              alt="Login"
              className="w-100 img-fluid"
            />
          </div>
          {/* Form column */}
          <div className="col-lg-5 col-12 p-4">
            <form>
              <h3 className="fw-normal mb-3 pb-2">SIGN IN</h3>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  id="form2Example18"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="form2Example19"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="mb-3">
                <button
                  className="btn btn-info btn-block"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <p>
                Don't have an account?{' '}
                <Link to="/Register" className="link-info" id="link">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Login;
