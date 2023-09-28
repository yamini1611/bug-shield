import React from "react";
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css';

const Navbarjsx = () => {
   


    return (
        <div>
            <Navbar expand="lg" className="divblack">
                <Container>
                    <Link to="/" id="link"><img src="https://egj2dd.p3cdn1.secureserver.net/wp-content/uploads/2017/06/logo-white.png" className="transparent secondary" alt="CG-VAK Software &amp; Exports Ltd" /></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link id="link" to='/' ><h5 className="ms-2">Services</h5></Link>
                            <Link id="link" to='/RaiseIssue' ><h5 className="ms-3">Raise Issue</h5></Link>
                            <Link id="link" to='/' ><h5 className="ms-3">Contact us</h5></Link>
                           
                       
                        </Nav>
                        <Nav>
                        <Link id="link" to='/Login' ><h5 className="ms-3">Login</h5></Link>
                            <Link id="link" to='/Register' ><h5 className="ms-3">Register</h5></Link>
                        </Nav>
                        {/* <Nav>
                            {userRole === 'Admin' && (
                                <React.Fragment>
                                    <Nav.Link href="/admin" id="navlink">Admin Dashboard</Nav.Link>
                                </React.Fragment>
                            )}
                            {userRole === 'SA Team' && (
                                <React.Fragment>
                                    <Nav.Link href="/sa-team" id="navlink">SA Team Dashboard</Nav.Link>
                                </React.Fragment>
                            )}
                            {userRole === 'Users' && (
                                <React.Fragment>
                                    <Nav.Link href="/users" id="navlink">Users Dashboard</Nav.Link>
                                </React.Fragment>
                            )}
                            <Nav.Link href="/Login" id="navlink">Login</Nav.Link>
                            <Nav.Link href="/Register" id="navlink">Register</Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navbarjsx;
