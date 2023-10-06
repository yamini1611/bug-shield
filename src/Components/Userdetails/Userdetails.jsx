import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table, Input, Label, Form } from "reactstrap";
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { ToastContainer, toast } from "react-toastify";

const Userdetails = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [computers, setComputers] = useState([]);
  const [unassignedComputerIds, setUnassignedComputerIds] = useState([]);
  const [assignedComputerIds, setAssignedComputerIds] = useState([]);
  const [computerInfoComputerIds, setComputerInfoComputerIds] = useState([]);
  const [selectedComputerId, setSelectedComputerId] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const userToken = localStorage.getItem('token');
  const [deletedUserDetails, setDeletedUserDetails] = useState(null);
  
  const [editedUser, setEditedUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    roleId: 0,
    computerId: 0,
  });
  const [createUser, setcreateUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    roleId: 0,
    computerId: 0,
  });

  useEffect(() => {
    fetchDetails();
    fetchRoles();
    fetchUnassignedComputerIds();
  }, []);

  const roleOptions = [
    { label: "Admin", value: 1 },
    { label: "SA Team", value: 2 },
    { label: "Users", value: 3 },
  ];


  const fetchUnassignedComputerIds = async () => {
    try {
      const computerInfoResponse = await axios.get('https://localhost:44365/api/ComputerInfoes');
      const computerInfoData = computerInfoResponse.data;
      const allComputerIds = computerInfoData.map(computer => computer.computerId);
      console.log(allComputerIds);

      const usersResponse = await axios.get('https://localhost:44365/api/Users', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const assignedComputerIds = usersResponse.data.map(user => user.computerid);
      console.log(assignedComputerIds);

      const unassignedIds = allComputerIds.filter(computerId => !assignedComputerIds.includes(computerId));

      setUnassignedComputerIds(unassignedIds);
    } catch (error) {
      console.error("Error fetching unassigned computer IDs:", error);
    }
  };


  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44365/api/Roles', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const roleData = response.data;
      setRoles(roleData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };



  const handleEditUser = (user) => {
    setIsEditModalOpen(true);
    setEditingUserId(user.userid);
    setEditedUser({
      userId: user.userid,
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      roleId: user.roleid,
      computerId: user.computerid,
    });
  };
  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };
  const fetchDetails = async () => {
    try {
      const response = await axios.get('https://localhost:44365/api/Users');
      const userDetails = response.data;
      setUsers(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSaveCreate = async () => {
    try {
      const response = await axios.post('https://localhost:44365/api/Users', {

        username: createUser.username,
        password: createUser.password,
        phone: createUser.phone,
        email: createUser.email,
        roleId: createUser.roleId,
        computerId: selectedComputerId,
      });

      if (response.status === 200) {
        toast.success('User created successfully!');
        setIsCreateModalOpen(false);
        setcreateUser("");
        fetchDetails();
      } else {
        console.error('Failed to create user. Status code: ' + response.status);
      }
    } catch (error) {
      toast.error("All fields are required");
      console.error('Error creating user:', error);
    }
  };
 
  const handleSaveEdit = async (userId) => {
    try {
      const response = await axios.put(`https://localhost:44365/api/Users/details/${userId}`, {
        username: editedUser.username,
        password: editedUser.password,
        phone: editedUser.phone,
        email: editedUser.email,
        roleId: editedUser.roleId,
        computerId: editedUser.computerId,
      });

      if (response.status === 200) {
        toast.success('User details updated!');
        setIsEditModalOpen(false);
        fetchDetails();
      } else {
        console.error('Failed to update user details. Status code: ' + response.status);
      }
    } catch (error) {
      toast.error("Validation Error");
      console.error('Error updating user details:', error);
    }
  };
 
 
const fetchDeletedUserDetails = async (userId) => {
  try {
    const response = await axios.get(`https://localhost:44365/api/Users/${userId}`);
    console.log(response.data);
    const username = response.data.username;
    const email = response.data.email;
    const phone = response.data.phone;
    const roleId = response.data.roleid;
    const deletedUserDetails ={
      username:username,
      email:email,
      phone:phone,
      roleId:roleId,
    }
    console.log(deletedUserDetails);

    const postResponse = await axios.post('https://localhost:44365/api/Users/PostResigned', deletedUserDetails,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
    },
    });

    if (postResponse.status === 200) {
      toast.success("Deleted user posted as Resigned User successfully");
    } else {
      console.error("Failed to post deleted user details as Resigned User.");
    }
  } catch (error) {
    console.error("Error fetching or posting user details:", error);
  }
};

const handleDeleteUser = async (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      fetchDeletedUserDetails(userId);
      const response = await axios.delete(`https://localhost:44365/api/Users/${userId}`);

      if (response.status === 200) {
        toast.success("User deleted Successfully")
        fetchDetails();
      } else {
        console.error("Failed to delete user. Status code: " + response.status);
      }
    } catch (error) {
      toast.error("you can't delete a user who has raised query");
      console.error("Error deleting user:", error);
    }
  }
};

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'userid',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Computer ID',
        accessor: 'computerid',
      },
      {
        Header: 'Role ID',
        accessor: 'roleid',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <div>
            <button className="ms-2 btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" onClick={() => handleEditUser(row.original)}>
              <i className="fa-solid fa-user-pen"></i>
            </button>
            <button className="ms-2 btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={() => handleDeleteUser(row.original.userid)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, globalFilter },
    pageCount,
    canPreviousPage,
    canNextPage,
    nextPage,
    pageOptions,
    rows,
    previousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 4,
      },
    },
    useGlobalFilter,
    usePagination
  );
  console.log(computers);
  const availableComputers = computerInfoComputerIds.filter(
    computerId => !assignedComputerIds.includes(computerId)
  );

  return (
    <Container id="value" className="pb-1 mb-5">
      <div className="mt-2 pb-2">
        <h2 className="text-center">User Details</h2>
        <div className="d-flex">
          <Label className="me-3">Search</Label>
          <Input
            type="text"
            className="mb-3 w-25"
            placeholder="Search"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <h5 className="me-3">Add User</h5> <button className="btn btn-dark" onClick={handleCreateUser}>
            <i className="fa-solid fa-user-plus"></i>
          </button>

        </div>
      </div>

      <Table bordered responsive className="responsive" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} id="thead">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.userid}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="mb-5">
        <button onClick={() => previousPage()} className="btn btn-warning me-3" disabled={!canPreviousPage}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={() => nextPage()} className="btn btn-danger" disabled={!canNextPage}>
          <i className="fa-solid fa-arrow-right"></i>        </button>
        <span className="ms-5">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>

      <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(!isEditModalOpen)} id="">
        <ModalHeader toggle={() => setIsEditModalOpen(!isEditModalOpen)}><span id="modalheader">Edit User</span></ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="editUsername" className="form-label">
                Username
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="editUsername"
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              />
            </div>
            <div className="mb-3 d-none">
              <label htmlFor="editPassword" className="form-label">
                Password
              </label>
              <input
                required
                type="password"
                className="form-control"
                id="editPassword"
                value={editedUser.password}
                onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editComputerId" className="form-label">
                Computer ID
              </label>

              <input
                required
                min="1"
                type="number"
                className="form-control"
                id="editComputerId"
                value={editedUser.computerId}
                onChange={(e) => setEditedUser({ ...editedUser, computerId: parseInt(e.target.value) })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editRoleId" className="form-label">
                Role ID
              </label>
              <select
                className="form-select"
                id="editRoleId"
                value={editedUser.roleId}
                onChange={(e) => setEditedUser({ ...editedUser, roleId: parseInt(e.target.value) })}
              >
                <option value="" disabled>Select a role</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="editPhone" className="form-label">
                Phone
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="editPhone"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editEmail" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="editEmail"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleSaveEdit(editingUserId)}>
            Save
          </Button>

          <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isCreateModalOpen} toggle={() => setIsCreateModalOpen(!isCreateModalOpen)} id="">
        <ModalHeader toggle={() => setIsCreateModalOpen(!isCreateModalOpen)}>
          <span id="modalheader">Create User</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="mb-3">
              <label htmlFor="createUsername" className="form-label">
                Username
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="createUsername"
                value={createUser.username}
                onChange={(e) => setcreateUser({ ...createUser, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="createPassword" className="form-label">
                Password
              </label>
              <input
                required
                type="password"
                className="form-control"
                id="createPassword"
                value={createUser.password}
                onChange={(e) => setcreateUser({ ...createUser, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="createComputerId" className="form-label">
                Computer ID
              </label>
              <select
                className="form-select"
                id="createComputerId"
                value={selectedComputerId}
                onChange={(e) => setSelectedComputerId(e.target.value)}
              >
                <option value="" disabled>Select a computer</option>
                {unassignedComputerIds.map((computerId) => (
                  <option key={computerId} value={computerId}>
                    {computerId}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="createRoleId" className="form-label">
                Role ID
              </label>
              <select
                required
                className="form-select"
                id="editRoleId"
                value={createUser.roleId}
                onChange={(e) => setcreateUser({ ...createUser, roleId: parseInt(e.target.value) })}
              >
                <option value="" disabled>Select a role</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="createPhone" className="form-label">
                Phone
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="createPhone"
                value={createUser.phone}
                onChange={(e) => setcreateUser({ ...createUser, phone: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="createEmail" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="createEmail"
                value={createUser.email}
                onChange={(e) => setcreateUser({ ...createUser, email: e.target.value })}
              />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveCreate}>
            Save
          </Button>
          <Button color="secondary" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      
      <ToastContainer />
    </Container>
  );
};

export default Userdetails;

