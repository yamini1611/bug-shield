import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Navbar.css";
import { logout } from "../Redux/authActions";

const Navbarjsx = () => {
    const roleId = useSelector((state) => state.auth.roleId);
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const dispatch = useDispatch();
    const roleIdFromSessionStorage = sessionStorage.getItem('roleId');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/Login');
        toast.success("Logged out Sucessfully");
        dispatch(logout());
    };

    console.log("RoleId from Redux Store:", roleId);

    return (
        <div>
            <Navbar expand="lg" className="divblack">

                <Link to="/" id="link">
                    <img
                        src="https://egj2dd.p3cdn1.secureserver.net/wp-content/uploads/2017/06/logo-white.png"
                        className="transparent secondary"
                        alt="CG-VAK Software &amp; Exports Ltd"
                    />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="collapse" ><i className="fa-solid fa-bars" style={{ color: "red" }}></i></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="text-start" >
                    <Nav className="me-auto">

                        {roleIdFromSessionStorage === '1' && (
                            <>
                                <Link id="link" to="/Userdetails">
                                    <h5 className="ms-3">Users </h5>
                                </Link>
                                <Link id="link" to='/RaisedQueries'>
                                    <h5 className="ms-3">Queries</h5>

                                </Link>
                                <Link id="link" to='/ComputerInfo'>
                                    <h5 className="ms-3">Computer Info</h5>

                                </Link>
                            </>

                        )}

                        {roleIdFromSessionStorage === '2' && (
                            <>
                                <Link id="link" to="/SATeamDashboard">
                                    <h5 className="ms-3">Alloted Queries</h5>
                                </Link>


                            </>

                        )}

                        {roleIdFromSessionStorage === '3' && (
                            <>
                                <Link id="link" to="/RaiseIssue">
                                    <h5 className="ms-3">Raise Issue</h5>
                                </Link>
                                <Link id="link" to="/Raisedquerybyuser">
                                    <h5 className="ms-3">Raised Issue</h5>
                                </Link>
                            </>

                        )}


                    </Nav>
                    <Nav>


                        {isAuthenticated ? (
                            <>
                                <h4 id="navlink" ><i className="fa-solid fa-user fa-flip me-2" style={{ color: "white" }}></i>{username}</h4>

                                <Link id="link" to="#" onClick={handleLogout}>
                                    <h5 className="ms-3">Logout</h5>
                                </Link>
                            </>

                        ) : (
                            <>
                                <Link id="link" to="/Register">
                                    <h5 className="ms-3">Register <i className="fa-solid fa-user-plus"></i></h5>
                                </Link>
                                <Link id="link" to="/Login">
                                    <h5 className="ms-3">Login <i className="fa-solid fa-right-to-bracket"></i></h5>
                                </Link>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            <ToastContainer />
        </div>
    );
};

export default Navbarjsx;
