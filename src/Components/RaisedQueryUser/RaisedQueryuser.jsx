import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
const RaisedQueriesUser = () => {
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetchQuery();
  }, []);

  const fetchQuery = async () => {
    try {
      const res = await axios.get(`https://localhost:44365/api/AllotedQueries/${userid}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (typeof res.data === 'object') {
        setQuery(res.data);
      } else {
        setError("API response is not an object");
      }
    } catch (error) {
      setError("Error fetching query: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="raised" className="container">
    {loading && <h4 className="mt-5 text-center">Raised Query has not been Allotted to SA Team</h4>}
    {error && (
      <div className="row">
        <div className="col-md-5">
        <img
            src="https://img.freepik.com/free-photo/funny-3d-illustration-american-referee_183364-80287.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=ais"
            alt="Error"
            className="img-fluid"
          ></img>
        </div>
        <div className="col-md-7">
        
          <h2 className="mt-5 p-5 text-center">Your Raised Query has not been Allotted to SA Team</h2>

        <Link className="btn btn-dark" to="/RaiseIssue">Raise Another Ticket</Link>
        </div>
      </div>
    )}
    {!loading && !error && (
      <div className="p-5">
        <h1 className="pt-5 text-center">Raised Queries</h1>
  
        <Table bordered responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Query</th>
              <th>Alloted SA</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{query.allotid}</td>
              <td>{query.allotedQueries}</td>
              <td>{query.sauser}</td>
              <td>{query.progress}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )}
  </div>
  
  );
};

export default RaisedQueriesUser;
