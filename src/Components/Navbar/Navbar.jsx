import React, { useState } from "react";
import { Button } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Navbar.css";
import { logout } from "../Redux/authActions";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { decryptPassword } from "../utilities/Utility";
const Navbarjsx = () => {
    const roleId = useSelector((state) => state.auth.roleId);
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid');
    const Phone = localStorage.getItem('phone');
    const Password = localStorage.getItem('password');
    const decryptedPassword = decryptPassword(Password);
    console.log(decryptedPassword);
    const email = localStorage.getItem('email');
    const computerId = localStorage.getItem('computerid');
    const handleLogout = () => {
        navigate('/Login');
        toast.success("Logged out Successfully");
        dispatch(logout());
    };

    console.log("RoleId from Redux Store:", roleId);

    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: username,
        password: decryptedPassword,
        phone: Phone,
        email: email,
        computerid: computerId,
        roleId: roleId,
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`https://localhost:44365/api/Users/details/${userId}`, userDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success("Profile Updated");
                handleClose();
            }
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

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
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="collapse">
                    <i className="fa-solid fa-bars" style={{ color: "red" }}></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="text-start">
                    <Nav className="me-auto">

                        {roleId === '1' && (
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
                                <Link id="link" to='/Errorlog'>
                                    <h5 className="ms-3">Error Log</h5>

                                </Link>
                            </>

                        )}

                        {roleId === '2' && (
                            <>
                                <Link id="link" to="/SATeamDashboard">
                                    <h5 className="ms-3">Alloted Queries</h5>
                                </Link>


                            </>

                        )}

                        {roleId === '3' && (
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
                                <Dropdown isOpen={showModal} toggle={handleShow}>
                                    <DropdownToggle className="transparent" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                                        <h4
                                            id="navlink"
                                            className="mt-2 text-capitalize"
                                        >
                                            <i
                                                className="fa-solid fa-user fa-flip me-2"
                                                style={{ color: "white" }}
                                            ></i>
                                            {username}
                                        </h4>
                                    </DropdownToggle>

                                    
                                </Dropdown>

                                <Link id="link" to="/Login" onClick={handleLogout}>
                                    <h5 className="ms-3 mt-3">Logout</h5>
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

            {/* Edit Profile Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={userDetails.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userDetails.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={userDetails.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="d-none" controlId="number">
                            <Form.Label>ComputerId</Form.Label>
                            <Form.Control
                                type="number"
                                name="computerid"
                                value={userDetails.computerid}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group  className="d-none" controlId="roleid">
                            <Form.Label>Role ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="roleid"
                                value={userDetails.roleId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="btn-warning" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btn-danger" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Navbarjsx;
