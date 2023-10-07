import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import {
    Container,
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    InputGroup
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

const RaisedQueries = () => {
    const [details, setDetails] = useState([]);
    const [innerModal, setInnerModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const userToken = localStorage.getItem('token');
    const [selectedQueryDetails, setSelectedQueryDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const allocatedQueryIds = JSON.parse(sessionStorage.getItem('allocatedQueryIds')) || [];

        const fetchDetails = async () => {
            try {
                const response = await axios.get('https://localhost:44365/api/Queries', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });


                const Details = response.data.map((query) => ({
                    ...query,
                    isAllocated: allocatedQueryIds.includes(query.queryId),
                }));
                setDetails(Details);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:44365/api/Users', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const filteredUsers = response.data.filter((user) => user.roleid === 2);
                console.log(filteredUsers);
                setFilteredUsers(filteredUsers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDetails();
        fetchUsers();
    }, [userToken]);

    const toggleInnerModal = () => {
        setInnerModal(!innerModal);
    };

    const handleAllocate = async () => {
        if (!selectedUserId) {
            toast.error('Please select a user to allocate the query.');
            return;
        }

        if (!selectedQuery) {
            toast.error('No query selected to allocate.');
            return;
        }

        const SendEmail = async () => {
            const fromEmail = localStorage.getItem('email');
            try {
                const usersResponse = await axios.get('https://localhost:44365/api/Users', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                if (usersResponse.status === 200) {
                    console.log(selectedUserId);
                    const user = usersResponse.data.find((user) => user.username === selectedUserId);
                    console.log(user);
                    if (user) {
                        const toEmail = user.email;
                        console.log("to email", toEmail);
                        await axios.post('https://localhost:44365/api/AllotedQueries/Email', {
                            fromEmail: fromEmail,
                            toEmail: toEmail,
                        }, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                                'Content-Type': 'application/json',
                            },

                        });
                        toast.success("Email sent Successfully");
                    } else {
                        console.error('User not found with the specified userId.');
                    }
                } else {
                    console.error('Failed to fetch user data. Status code:', usersResponse.status);
                }
            } catch (err) {
                console.error('Error fetching user data or sending email:', err);
            }
        };

        const allotedQuery = {
            SAuser: selectedUserId,
            AllotedQueries: selectedQuery.queryDetails,
            RaisedTime: selectedQuery.raisedTime,
            RaisedUser: selectedQuery.userId,
            SolvedTime: selectedQuery.solvedTime,
            Progress: "Assigned",
            Remarks: "Query Alloted to you",
            Status: "Alloted"
        };

        try {
            const response = await axios.post('https://localhost:44365/api/AllotedQueries', allotedQuery, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                toast.success('Query allocated to SA');
                console.log(response);

                SendEmail();
                const updatedDetails = details.map((query) => {
                    if (query.queryId === selectedQuery.queryId) {
                        return { ...query, isAllocated: true };
                    }
                    return query;
                });
                setDetails(updatedDetails);

                const allocatedQueryIds = updatedDetails
                    .filter((query) => query.isAllocated)
                    .map((query) => query.queryId);
                sessionStorage.setItem('allocatedQueryIds', JSON.stringify(allocatedQueryIds));


            }

            setInnerModal(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleViewProgress = (query) => {
        fetchQueryDetails(query.queryDetails);
    };
    const handleAllocateTicket = (query) => {
        setSelectedQuery(query);
        setCurrentPage(1);
        toggleInnerModal();
    };
    const fetchQueryDetails = async (queryDetails) => {
        try {
            const response = await axios.get('https://localhost:44365/api/AllotedQueries', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const matchingQueryDetails = response.data.find((query) => query.allotedQueries === queryDetails);

            setSelectedQueryDetails(matchingQueryDetails);
        } catch (err) {
            console.error(err);
        }
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = details.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredItems = currentItems.filter((query) =>
        query.queryDetails.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <Container className='mt-5'>
            <h2>Raised Queries</h2>
            {/* Search Input */}
            <div className='d-flex mb-3'>
                <h4>Search</h4>
                <InputGroup className='ms-3 w-25'>
                    <Input
                 
                        type='text'
                        placeholder='Search by query details...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                <Button
                    onClick={() => setSearchQuery('')}
                    className='btn-secondary ms-2'
                >
                    Clear
                </Button>
            </div>
            <Table striped bordered hover responsive className='mb-5'>
                <thead>
                    <tr>
                        <th>Query ID</th>
                        <th>User ID</th>
                        <th>Raised Time</th>
                        <th>Possible Solving Time</th>
                        <th>Query Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length === 0 ? (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    ) : (
                        filteredItems.map((query) => (
                            <tr key={query.queryId}>
                                <td>{query.queryId}</td>
                                <td>{query.userId}</td>
                                <td>{query.raisedTime}</td>
                                <td>{query.solvedTime}</td>
                                <td>{query.queryDetails}</td>
                                <td>
                                    {query.isAllocated ? (
                                        <>
                                            <Button className='btn-dark me-2' disabled>
                                                <AssignmentOutlinedIcon />
                                            </Button>

                                            <Button
                                                className='btn-info'
                                                onClick={() => handleViewProgress(query)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i className="fa-solid fa-expand"></i>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            className='btn-dark'
                                            onClick={() => handleAllocateTicket(query)}
                                        >
                                            Allocate Ticket
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({ length: Math.ceil(details.length / itemsPerPage) }).map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>   <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Progress</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedQueryDetails ? (
                                <div className='text-start'>
                                    <p>Query ID: {selectedQueryDetails.alotid}</p>
                                    <p>Raised User: {selectedQueryDetails.raisedUser}</p>
                                    <p>Progress: {selectedQueryDetails.progress}</p>
                                    <p>Remarks: {selectedQueryDetails.remarks}</p>
                                    <p>Assigned To:{selectedQueryDetails.sauser}</p>
                                    <p>Solving  Time:{selectedQueryDetails.solvedTime}</p>
                                </div>
                            ) : (
                                <p>Loading query details...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inner Modal */}
            <Modal isOpen={innerModal} toggle={toggleInnerModal}>
                <ModalHeader toggle={toggleInnerModal}>Select User</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='userSelect'>Select a User:</Label>
                        <Input
                            type='select'
                            name='userSelect'
                            id='userSelect'
                            onChange={(e) => setSelectedUserId(e.target.value)}
                        >
                            <option value=''>Select a user</option>
                            {filteredUsers.map((user) => (
                                <option key={user.userid} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-dark' onClick={handleAllocate}>
                        Allocate Ticket
                    </Button>
                    <Button color='secondary' onClick={toggleInnerModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <ToastContainer />
        </Container>
    );
};

export default RaisedQueries;
