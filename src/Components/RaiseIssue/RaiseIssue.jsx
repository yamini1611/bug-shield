import React from "react";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import '../RaiseIssue/RaiseIssue.css';
import email from '../Assets/Images/email.jpg';
import { Modal } from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FormGroup, Input, Label, Form } from "reactstrap";

const RaiseIssue = () => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    try {

    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  return (
    <Container>
      <div className="row">
        <div className="col-md-5 mt-5">
          <img id="queryimg" alt="img" src="https://img.freepik.com/free-vector/computer-troubleshooting-concept-illustration_114360-7616.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=ais"></img>
        </div>
        <div className="col-md-7 mt-5">
          <h2 className="mt-5 text-center">Encountering a Challenge?</h2>
          <h3 className="mt-3 text-center">Our Dedicated Team is Ready to Assist!</h3>
          <p className="text-center">
            If you encounter any issues, our team is here to help. Reach out to us for assistance.
          </p>
          <Button className="btn btn-dark mt-3 mb-2" onClick={() => setModalShow(true)} >   <AddIcon />  Raise Ticket

          </Button><br></br>
          <img src={email} alt="mail" id="mailimg" height={300} width={50} ></img>

        </div>
        <Modaldetails
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>

    </Container>
  )
}

export default RaiseIssue;

export function Modaldetails(props) {
  const [details, setDetails] = useState('');

  const handlepostquery = async () => {
    try {
      const currentTime = new Date().toISOString();
      const threeHoursFromNow = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString();
  
      const userToken = localStorage.getItem('token'); 
      const userId = localStorage.getItem('userid');
      console.log(details);
      const response = await axios.post('https://localhost:44365/api/Queries/Postqueries', {
        QueryDetails: details,
        RaisedTime: currentTime,
        SolvedTime: threeHoursFromNow,
        UserId: userId, 
        IsSolved: false
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
        toast.success("Successfully posted Ticket");
       console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title " className="ms-auto " >
          <h4 id='head'>Tickets Details</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>

          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Enter your Email id"
              type="email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="exampleText">
             Query details
            </Label>
            <Input
              id="exampleText"
              placeholder="Enter Query Details"
              name="text"
              type="textarea"
              
              onChange={(e) => setDetails(e.target.value) }           
                 required
            />
          </FormGroup>


        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
      <Button  className="btn btn-dark"  onClick={handlepostquery}>Post</Button>
        <Button  className="btn btn-dark"  onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <ToastContainer/>
    </Modal>
  );
}

