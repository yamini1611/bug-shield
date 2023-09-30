import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import '../Userdetails/Userdetails.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Userdetails = () => {
  const [users, setUsers] = useState([]);
  const [Computerinfo ,setComputerinfo] = useState([]);
  const userToken = localStorage.getItem('token');
  const [modal, setModal] = useState(false);
  
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get('https://localhost:44365/api/Users');
      const userDetails = response.data;
      const response1 = await axios.get('https://localhost:44365/api/ComputerInfoes', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const Computerdetails = response1.data;
      setComputerinfo(Computerdetails);
      console.log(userDetails);
      setUsers(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  return (
    <Container id="value">
      <div className="mt-5">
        <h2 className="text-center">User Details</h2>
      </div>

      <Table bordered className="responsive">
        <thead >
          <tr id="thead">
            <th>User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>ComputerId</th>
            <th>Role ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td >{user.userid}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                {user.computerid !== null ? (
                  user.computerid
                ) : (
                  <>
                    Not assigned
                    <button className=" ms-2 btn btn-dark"onClick={toggle} >Assign</button>
                  </>
                )}
              </td>
              <td>{user.roleid}</td>
            </tr>
          ))}
        </tbody> <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      </Table>
    </Container>
  );
};

export default Userdetails;

