import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/authActions";
import "../Navbar/Navbar.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Navbarjsx = () => {
    const roleId = useSelector((state) => state.auth.roleId);
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const dispatch = useDispatch();
    const roleIdFromSessionStorage = sessionStorage.getItem('roleId');
    const username = localStorage.getItem('username');
    const Navigate = useNavigate();
    const handleLogout = () => {
        toast.success("logged out Sucessfully");

        dispatch(logout());
        Navigate('/');
    };

    console.log("RoleId from Redux Store:", roleId);

    return (
        <div>
            <Navbar expand="lg" className="divblack">
                <Container>
                    <Link to="/" id="link">
                        <img
                            src="https://egj2dd.p3cdn1.secureserver.net/wp-content/uploads/2017/06/logo-white.png"
                            className="transparent secondary"
                            alt="CG-VAK Software &amp; Exports Ltd"
                        />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Link id="link" to="/">
                                <h5 className="ms-2">Services</h5>
                            </Link>
                            {roleIdFromSessionStorage === '1' && (
                                <>
                                    <Link id="link" to="/Userdetails">
                                        <h5 className="ms-3">Users details</h5>
                                    </Link>
                                    <Link id="link" to='/RaisedQueries'>
                                        <h5 className="ms-3">Raised Queries</h5>

                                    </Link>
                                </>

                            )}

                            {roleIdFromSessionStorage === '2' && (
                                <Link id="link" to="/SATeamDashboard">
                                    <h5 className="ms-3">Alloted Queries</h5>
                                </Link>
                            )}

                            {roleIdFromSessionStorage === '3' && (
                                <Link id="link" to="/RaiseIssue">
                                    <h5 className="ms-3">Raise Issue</h5>
                                </Link>
                            )}
                            <Link id="link" to="/">
                                <h5 className="ms-3">About </h5>
                            </Link>
                            <Link id="link" to="/">
                                <h5 className="ms-3">Contact</h5>
                            </Link>

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
                                        <h5 className="ms-3">Register</h5>
                                    </Link>
                                    <Link id="link" to="/Login">
                                        <h5 className="ms-3">Login</h5>
                                    </Link>
                                </>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer />
        </div>
    );
};

export default Navbarjsx;
