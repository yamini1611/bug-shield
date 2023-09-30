import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Button, Row, CardText, CardTitle } from 'reactstrap';

const RaisedQueries = () => {
  const [details, setDetails] = useState([]);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    fetchDetails();
  },[]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get('https://localhost:44365/api/Queries', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    
     
      const Details = response.data;
      setDetails(Details);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className='mt-5'>
      <Row>
        <h2>Query Details</h2>
        {details.map((query) => (
          <Col sm='6' key={query.queryId}>
            <Card body className='mt-3 mb-4 w-75 ms-5'>
              <CardTitle tag='h5'>Query ID: {query.queryId}</CardTitle>
              <CardText>Raised Time: {query.raisedTime}</CardText>
              <CardText>Possible Solving Time: {query.solvedTime}</CardText>
              <CardText>User ID: {query.userId}</CardText>
              <CardText>Is Solved: {query.IsSolved ? 'Yes' : 'No'}</CardText>
              <CardText>Query Details: {query.queryDetails}</CardText>
              <Button className='w-75 ms-5 btn-dark'>Allocate Ticket</Button>
            </Card> 
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RaisedQueries;
