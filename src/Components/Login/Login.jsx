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

        console.log('user details', response.data);
        console.log(password);
        dispatch(loginSuccess(userToken, roleId ,userid)); 
      
        toast.success('Logged in Successfully!', {
          icon: <CheckCircleIcon />,
        });
      
        localStorage.setItem('token', userToken);
        localStorage.setItem('userid' ,userid);
        localStorage.setItem('username' ,username);
        localStorage.setItem('email' ,email);
        localStorage.setItem('password', encryptedPassword); 
        Navigate('/');
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
      <section className="vh-75 ms-5">
     
          <div className="row">
            <div className="col-md-5 col-sm-12 d-block text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "23rem" }}>
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "" }}>
                    SIGN IN
                  </h3>
                  <div className="form-outline mb-4">
                    <div className="d-flex align-items-center">
                      <label className="form-label me-5">Email </label>
                      <input
                        type="email"
                        id="form2Example18"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="d-flex align-items-center">
                      <label className="form-label me-3">Password </label>
                      <input
                        type="password"
                        id="form2Example19"

                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>


                  <p className="small mb-5 pb-lg-2">
                    {/* <a className="text-muted" href="#!">
                      Forgot password?
                    </a> */}
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/Register" className="link-info" id="link">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-md-5 px-0 d-none d-xl-block ">
              <img
                src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=ais"
                alt="Login"
                className="w-100 vh-75 mt-0"
              />
            </div>
          </div>
      

      </section>
      <ToastContainer    position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"/>
    </div>
  );
};

export default Login;
