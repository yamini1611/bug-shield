import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, FormControl } from "react-bootstrap";

const Errorlog = () => {
    const [details, setDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        const response = await axios.get('https://localhost:44365/api/ErrorLogs', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setDetails(response.data);
    };
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = details.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);  
    };
    const filteredItems = currentItems.filter((item) =>
        item.query.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="container mt-3">
          <div className="d-flex">
            <h5 className="mt-2">Search </h5>
            <Form className="mb-3 ms-2">
                <FormControl
                    type="text"
                    placeholder="Search by Query"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Form>
            </div>  
            <h3>Error Log</h3>
            <Table bordered responsive striped>
                <thead>
                    <tr>
                        <th>Error log Id</th>
                        <th>Query</th>
                        <th>Raised UserId</th>
                        <th>Solved by</th>
                    </tr>
                </thead>
                <tbody>
                {filteredItems.length === 0 ? (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    ) :(
                    filteredItems.map((query) => (
                        <tr key={query.errorLogId}>
                            <td>{query.errorLogId}</td>
                            <td>{query.query}</td>
                            <td>{query.userId}</td>
                            <td>{query.solvedby}</td>
                        </tr>
                    ))
                    )}
                </tbody>
            </Table>
            <Pagination  className="justify-content-center" >
                {Array.from({ length: Math.ceil(details.length / perPage) }).map((_, index) => (
                    <Pagination.Item 
                  
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default Errorlog;
