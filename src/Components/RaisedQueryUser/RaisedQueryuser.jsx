import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
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
    <div>
      <h1 className="pt-5">Raised Queries</h1>
      {loading && <h4 className="m-5">Raised Query has not been Alloted to SA Team</h4>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
      <div className="p-5">
            <Table bordered >
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
                    <td>{query.alotid}</td>
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
