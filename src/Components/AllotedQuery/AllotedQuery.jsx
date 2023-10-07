import axios from 'axios';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';

//Alloted queries
class AllotedQueries extends Component {
    username = localStorage.getItem('username');
    token = localStorage.getItem('token');
    state = {
        allotedQueries: [],
        acceptedQueries: {},
        isEditing: false,
        editedQuery: {
            progress: '',
            solvedTime: '',
            remarks: '',
            raisedUser: '',
            Query: '',
            Solvedby: '',
        },
        editedQueryId: null,
    };

    decryptPassword = (encryptedPassword) => {
        return encryptedPassword.split('').reverse().join('');
    };
    componentDidMount() {
        this.fetchAllotedQueries();
        const acceptedQueries =
            JSON.parse(sessionStorage.getItem('acceptedQueries')) || {};
        this.setState({ acceptedQueries });
    }

    async fetchAllotedQueries() {
        try {
            const response = await axios.get('https://localhost:44365/api/AllotedQueries', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            const { data } = response;
            const filteredQueries = data.filter(
                (query) => query.sauser === this.username
            );
            this.setState({
                allotedQueries: filteredQueries,
            });
        } catch (error) {
            console.error(error);
        }
    }

    //accept button
    acceptButtonClickHandler = async (query) => {
        const fromEmail = localStorage.getItem('email');
        const queryDetails = query.allotedQueries;
        const storedPassword = localStorage.getItem('password');
        const decryptedPassword = this.decryptPassword(storedPassword);
        try {
            const userResponse = await axios.get(
                `https://localhost:44365/api/Users/${query.raisedUser}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );
            const toEmail = userResponse.data.email;
            const SolvedTime = query.SolvedTime;
            console.log(toEmail);
            toast.success('Email is sending ....', {
                icon: <i className="fa-solid fa-spinner fa-spin" style={{ color: "red" }}></i>,

            });
            const response = await axios.post(
                'https://localhost:44365/api/AllotedQueries/SendEmail',
                {
                    fromEmail: fromEmail,
                    toEmail: toEmail,
                    query: queryDetails,
                    password: decryptedPassword,
                    SolvedTime: SolvedTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                toast.success('Email is sent successfully');
                this.setState(
                    (prevState) => ({
                        acceptedQueries: {
                            ...prevState.acceptedQueries,
                            [query.alotid]: true,
                        },
                    }),
                    () => {
                        sessionStorage.setItem(
                            'acceptedQueries',
                            JSON.stringify(this.state.acceptedQueries)
                        );
                        this.openEditModal(query);
                    }
                );
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    openEditModal = (query) => {
        console.log(query);
        const Query = query.allotedQueries;
        localStorage.setItem('Query', Query);
        const SolvedTime = query.solvedTime;
        localStorage.setItem('SolvedTime', SolvedTime);
        const ToEmail = query.raisedUser;
        localStorage.setItem('ToEmail', ToEmail);
        const Progress = query.progress;
        localStorage.setItem('progress', Progress);
        const solvedby = query.sauser;
        localStorage.setItem('solvedby', solvedby);
        this.setState({
            isEditing: true,
            editedQuery: {
                progress: query.progress,
                solvedTime: query.solvedTime || '',
                remarks: query.remarks,
                allotedQueries: query.allotedQueries,
                raisedUser: query.raisedUser,
                sauser: query.sauser,
            },
            editedQueryId: query.alotid,
        });
    };
    closeEditModal = () => {
        this.setState({ isEditing: false });
    };

    handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editedQuery: {
                ...prevState.editedQuery,
                [name]: value,
            },
        }));
    };
    handleEditSubmit = async () => {
        const { editedQuery, editedQueryId } = this.state;
        const { token } = this;

        const response = await axios.put(
            `https://localhost:44365/api/AllotedQueries/${editedQueryId}`,
            editedQuery,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        //email to user
        const SendEmail = async () => {
            try {
                const res = await axios.get('https://localhost:44365/api/Users', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (res.status === 200) {
                    const EmailTo = localStorage.getItem('ToEmail');
                    const userData = res.data;
                    console.log("Email to ", EmailTo);
                    const matchingUser = userData.find(user => user.userid.toString() === EmailTo);
                    console.log("matched user", matchingUser);

                    if (matchingUser) {
                        const ToEmailvalue = matchingUser.email;
                        console.log('ToEmailvalue:', ToEmailvalue);
                        localStorage.setItem('EmailTo', ToEmailvalue);
                    } else {
                        console.log('No matching user found for ToEmail:', EmailTo);
                    }
                }
                const fromEmail = localStorage.getItem('email');
                const ToEmail = localStorage.getItem('EmailTo');
                const storedPassword = localStorage.getItem('password');
                const decryptedPassword = this.decryptPassword(storedPassword);
                const Query = localStorage.getItem('Query');
                const solvedTime = localStorage.getItem('SolvedTime');
                const progress = localStorage.getItem('progress');

                await axios.post('https://localhost:44365/api/AllotedQueries/EmailToUser', {
                    fromEmail: fromEmail,
                    toEmail: ToEmail,
                    password: decryptedPassword,
                    query: Query,
                    solvedTime: solvedTime,
                    progress: progress,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                toast.success("Email sent Successfully to user");
                SendEmailToAdmin();
            } catch (err) {
                console.error('Error fetching user data or sending email:', err);
            }
        };
        //email to admin
        const SendEmailToAdmin = async () => {
            const fromEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');
            const decryptedPassword = this.decryptPassword(storedPassword);
            const Query = localStorage.getItem('Query');
            const solvedTime = localStorage.getItem('SolvedTime');
            const progress = localStorage.getItem('progress');
            try {
                await axios.post('https://localhost:44365/api/AllotedQueries/EmailToAdmin', {
                    fromEmail: fromEmail,
                    password: decryptedPassword,
                    query: Query,
                    solvedTime: solvedTime,
                    progress: progress
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                toast.success("Email sent Successfully to Admin");
            } catch (err) {
                console.error('Error fetching user data or sending email:', err);
            }
        };
        if (response.status === 200) {
            toast.success("Query Updated Successfully");
            this.fetchAllotedQueries();
            SendEmail();

            if (editedQuery.progress === 'Completed') {
                const Query = localStorage.getItem('Query');
                const solvedby = localStorage.getItem('solvedby');
                const errorLog = {
                    userId: editedQuery.raisedUser,
                    query: Query,
                    solvedby: solvedby
                };

                const errorLogResponse = await axios.post(
                    'https://localhost:44365/api/ErrorLogs',
                    errorLog,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (errorLogResponse.status === 200) {
                    toast.success('Error logged successfully');

                    const queriesResponse = await axios.get('https://localhost:44365/api/Queries', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (queriesResponse.status === 200 && Array.isArray(queriesResponse.data)) {
                        console.log("queriesResponse.data:", queriesResponse.data);

                        for (const query of queriesResponse.data) {
                            if (query.queryDetails === Query) {
                                await axios.delete(
                                    `https://localhost:44365/api/Queries/${query.queryId}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            'Content-Type': 'application/json',
                                        },
                                    }
                                );
                                console.log('Query deleted from QUERIES API');
                                break;
                            }
                        }

                        await axios.delete(
                            `https://localhost:44365/api/AllotedQueries/${editedQueryId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                    } else {
                        console.log('Error fetching queries data.');
                    }

                    this.closeEditModal();
                    this.fetchAllotedQueries();
                } else {
                    toast.error('Error updating query');
                }
            }
        }
    };

    render() {
        const { allotedQueries, acceptedQueries } = this.state;
        return (
            <Container className='mt-5 pb-5 mb-5 w-100'>
                <h3>Alloted Queries</h3>
                <Table striped bordered hover responsive className='mb-5'>
                    <thead>
                        <tr className='text-light'>
                            <th>Query ID</th>
                            <th>Alloted Queries</th>
                            <th>Raised Time</th>
                            <th>Solved Time</th>
                            <th>Raised User</th>
                            <th>Progress</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allotedQueries.length === 0 ? (
                            <tr>
                                <td colSpan="8">
                                    <h3>No Query Alloted To You 😁</h3>
                                </td>
                            </tr>
                        ) : (
                            allotedQueries.map((query) => (
                                <tr key={query.alotid}>
                                    <td>{query.alotid}</td>
                                    <td>{query.allotedQueries}</td>
                                    <td>{query.raisedTime}</td>
                                    <td>{query.solvedTime}</td>
                                    <td>{query.raisedUser}</td>
                                    <td>{query.progress}</td>
                                    <td>{query.remarks}</td>
                                    <td>
                                        {!acceptedQueries[query.alotid] ? (
                                            <>
                                                <Button
                                                    className='btn-dark'
                                                    onClick={() => this.acceptButtonClickHandler(query)}
                                                >
                                                    Accept
                                                </Button>

                                            </>
                                        ) : (
                                            <div className='d-flex'>
                                                <Button className='btn-success' disabled>
                                                    Accepted
                                                </Button>
                                                <Button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    className='btn-warning ms-2'
                                                    onClick={() => this.openEditModal(query)}
                                                >
                                                    Modify
                                                </Button>

                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </Table>
                {/* Modify/Edit Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Progress
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.closeEditModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <FormGroup>
                                        <Label for='progress' className='mx-auto'>Progress</Label>
                                        <Input
                                            type='select'
                                            name='progress'
                                            id='progress'
                                            value={this.state.editedQuery.progress}
                                            onChange={this.handleEditFieldChange}
                                        >
                                            <option value='In Progress'>In Progress</option>
                                            <option value='Delayed'>Delayed</option>
                                            <option value='Completed'>Completed</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='solvedTime'>Solved Time</Label>
                                        <Input
                                            type='datetime-local'
                                            name='solvedTime'
                                            id='solvedTime'
                                            value={this.state.editedQuery.solvedTime}
                                            onChange={this.handleEditFieldChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for='Remarks'>Remarks
                                        </Label>
                                        <Input
                                            type='text'
                                            name='remarks'
                                            id='remarks'
                                            value={this.state.editedQuery.remarks}
                                            onChange={this.handleEditFieldChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className='d-none'>
                                        <Label for='Raiseduser'>Raised user
                                        </Label>
                                        <Input
                                            type='text'
                                            name='raisedUser'
                                            id='raiseduser'
                                            value={this.state.editedQuery.raisedUser}
                                            onChange={this.handleEditFieldChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className='d-none'>
                                        <Label for='Q'>Solved by
                                        </Label>
                                        <Input
                                            type='text'
                                            name='Solvedby'
                                            id='raiseduser'
                                            value={this.state.editedQuery.Solvedby}
                                            onChange={this.handleEditFieldChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className='d-none'>
                                        <Label for='Raiseduser'>Raised user
                                        </Label>
                                        <Input
                                            type='text'
                                            name='Query'
                                            id='query'
                                            value={this.state.editedQuery.Query}
                                            onChange={this.handleEditFieldChange}
                                        />
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={this.closeEditModal}
                                >
                                    Close
                                </button>
                                <Button color='primary' onClick={this.handleEditSubmit}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Container>
        );
    }
}

export default AllotedQueries;
