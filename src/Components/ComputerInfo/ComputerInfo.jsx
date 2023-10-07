import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Table, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { ToastContainer, toast } from "react-toastify";
const ComputerInfo = (args) => {
    const [computerinfo, setComputerInfo] = useState([]);
    const [editingComputerInfo, setEditingComputerInfo] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const userToken = localStorage.getItem('token');
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newComputerInfo, setNewComputerInfo] = useState({
        computerName: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
        operatingSystem: "",
        installedRamgb: "",
        processor: "",
        ipaddress: "",
        macaddress: "",
        purchaseDate: "",
        warrantyEndDate: "",
        location: "",
        notes: "",
    });

    useEffect(() => {
        fetchComputer();
    }, []);

    const fetchComputer = async () => {
        const response = await axios.get('https://localhost:44365/api/ComputerInfoes')
        const computerDetails = response.data;
        setComputerInfo(computerDetails);
    }

    const data = useMemo(() => computerinfo, [computerinfo]);
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'computerName',
            },
            {
                Header: 'Manufacturer',
                accessor: 'manufacturer',
            },
            {
                Header: 'Model',
                accessor: 'model',
            },

            {
                Header: 'OS',
                accessor: 'operatingSystem',
            },
            {
                Header: 'Installed RAM',
                accessor: 'installedRamgb',
            },


            {
                Header: 'Location',
                accessor: 'location',
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
        gotoPage,
        state: { pageIndex, globalFilter },
        pageCount,
        canPreviousPage,
        canNextPage,
        nextPage,
        pageOptions,
        rows,
        previousPage,
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

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const openEditModal = (computerInfo) => {
        setEditingComputerInfo(computerInfo);
    };

    const closeEditModal = () => {
        setEditingComputerInfo(null);
    };

    const handleCreateComputerInfo = async () => {
        try {
            const response = await axios.post(
                "https://localhost:44365/api/ComputerInfoes",
                newComputerInfo,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            if (response.status === 201) {
                closeCreateModal();
                setNewComputerInfo({
                    computerName: "",
                    manufacturer: "",
                    model: "",
                    serialNumber: "",
                    operatingSystem: "",
                    installedRamgb: "",
                    processor: "",
                    ipaddress: "",
                    macaddress: "",
                    purchaseDate: "",
                    warrantyEndDate: "",
                    location: "",
                    notes: "",
                });
                fetchComputer();
            }
        } catch (error) {
            console.error(error);
            toast.error(" All Fields are required");
        }
    };

    const handleUpdateComputerInfo = async (updatedComputerInfo) => {
        try {
            const response = await axios.put(
                `https://localhost:44365/api/ComputerInfoes/${updatedComputerInfo.computerId}`,
                updatedComputerInfo,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                closeEditModal();
                fetchComputer();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = (computerInfo) => {
        setDeleteConfirmation(computerInfo);
    };

    const cancelDelete = () => {
        setDeleteConfirmation(null);
    };
    const fetchComputerDetails = async (computerId) => {
        try {
            const response = await axios.get(
                `https://localhost:44365/api/ComputerInfoes/${computerId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching computer details:", error);
            throw error;
        }
    };

    const handleDeleteComputerInfo = async (computerId) => {
        try {
            const computerDetails = await fetchComputerDetails(computerId);
            console.log(computerDetails);
            const backupResponse = await axios.post(
                "https://localhost:44365/api/ComputerInfoes/PostBackUp",
                computerDetails,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            if (backupResponse.status === 200) {
                const deleteResponse = await axios.delete(
                    `https://localhost:44365/api/ComputerInfoes/${computerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                if (deleteResponse.status === 200) {
                    toast.success("Deleted Successfully");
                    toast.success("posted in backup Computers");

                    setDeleteConfirmation(null);
                    fetchComputer();
                }
            }
        } catch (error) {
            toast.error("Error: " + error.message);
            console.error(error);
        }
    };
    return (
        <Container className="mt-5  pb-5">
            <h2>Computer Details</h2>
            <div className="d-flex">
                <Label className="me-3">Search</Label>
                <Input
                    type="text"
                    className="mb-3 w-25"
                    placeholder="Search"
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <button className="ms-2 mb-3 p-1 btn btn-dark" onClick={openCreateModal}>
                    <i className="fa-solid fa-plus p-2"></i>
                </button>
            </div>
            <Table bordered responsive className=" justify-content-centercustom-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} id="thead">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                            <th>Action</th>

                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.original.computerId}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                <td className="d-flex">
                                    <Button
                                        color="warning"
                                        className="me-2"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"
                                        onClick={() => openEditModal(row.original)}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Button>

                                    <Button
                                        color="danger"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"

                                        onClick={() => confirmDelete(row.original)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="mb-3">
                <button onClick={() => previousPage()} className="btn btn-warning me-3" disabled={!canPreviousPage}>
                    <i className="fa-solid fa-arrow-left"></i>

                </button>
                <button onClick={() => nextPage()} className="btn btn-danger" disabled={!canNextPage}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
                <span className="ms-5">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
            </div>

            {/* Create Modal */}
            <Modal isOpen={createModalOpen} size="lg" toggle={closeCreateModal}  {...args}>
                <ModalHeader toggle={closeCreateModal}>Create Computer Info</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.computerName}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            computerName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Manufacturer</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.manufacturer}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            manufacturer: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Model</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.model}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            model: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Serial Number</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.serialNumber}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            serialNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Operating System</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.operatingSystem}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            operatingSystem: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Installed RAM (GB)</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.installedRamgb}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            installedRamgb: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Processor</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.processor}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            processor: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <Label>IP Address</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.ipaddress}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            ipaddress: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>MAC Address</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.macaddress}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            macaddress: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Purchase Date</Label>
                                <Input
                                    type="date"
                                    value={newComputerInfo.purchaseDate}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            purchaseDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Warranty End Date</Label>
                                <Input
                                    type="date"
                                    value={newComputerInfo.warrantyEndDate}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            warrantyEndDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.location}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            location: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Notes</Label>
                                <Input
                                    type="text"
                                    value={newComputerInfo.notes}
                                    onChange={(e) =>
                                        setNewComputerInfo({
                                            ...newComputerInfo,
                                            notes: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreateComputerInfo}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={!!editingComputerInfo} toggle={closeEditModal} size="xl">
                <ModalHeader toggle={closeEditModal}>Edit Computer Info</ModalHeader>
                <ModalBody>
                    {editingComputerInfo && (
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.computerName}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    computerName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Serial Number</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.serialNumber}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    serialNumber: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Operating System</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.operatingSystem}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    operatingSystem: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Installed RAM (GB)</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.installedRamgb}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    installedRamgb: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Processor</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.processor}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    processor: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>IP Address</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.ipaddress}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    ipaddress: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Model</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.model}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    model: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <Label>Manufacturer</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.manufacturer}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    manufacturer: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>MAC Address</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.macaddress}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    macaddress: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Purchase Date</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.purchaseDate}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    purchaseDate: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Warranty End Date</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.warrantyEndDate}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    warrantyEndDate: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Location</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.location}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    location: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Notes</Label>
                                        <Input
                                            type="text"
                                            value={editingComputerInfo.notes}
                                            onChange={(e) =>
                                                setEditingComputerInfo({
                                                    ...editingComputerInfo,
                                                    notes: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => handleUpdateComputerInfo(editingComputerInfo)}
                    >
                        Save
                    </Button>
                    <Button color="secondary" onClick={closeEditModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {/* Delete Confirmation */}
            <Modal isOpen={!!deleteConfirmation} toggle={cancelDelete}>
                <ModalHeader toggle={cancelDelete}>Confirm Deletion</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this computer info?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleDeleteComputerInfo(deleteConfirmation?.computerId)}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <ToastContainer />
        </Container>
    );
};

export default ComputerInfo;
