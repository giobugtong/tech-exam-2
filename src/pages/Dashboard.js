import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUser, sort } from "../actions";
import ConfirmModal from '../components/ConfirmModal';


export default function Dashboard() {
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [lastHeaderSorted, setLastHeaderSorted] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        showConfirmButton: false,
        showCloseButton: true
    });

    const handleDeleteButton = (user) => {
        setUserToDelete(user);
        setShowConfirmModal(true)
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(userToDelete));
        Toast.fire({
            html: `
                <span><b>${userToDelete.username}</b> deleted from user list.</span>
            `,
            icon: "success"
        });
        setShowConfirmModal(false);
    }
    
    const handleDeleteAllUsers = () => {
        setUserToDelete(null);
        setShowConfirmModal(true);
    }

    const handleAddUser = () => {
        navigate("/add");
    }

    const handleSort = (header) => {
        if (lastHeaderSorted === header) {
            const payload = {
                header,
                reverseSort: !isSorted
            }
            dispatch(sort(payload));
            setIsSorted(!isSorted);
            return
        }
        setIsSorted(false);
        const payload = {
            header,
            reverseSort: false
        }
        setLastHeaderSorted(header);
        dispatch(sort(payload));
    }

    return <>
        <h1 className="text-center">Dashboard</h1>
        <div className="my-4 mx-auto border p-3 rounded-3 shadow-sm" style={{ maxWidth: "1300px"}}>
            <div className="px-1 d-sm-flex justify-content-between align-items-center">
                <h4 className="my-sm-3 text-center text-sm-start">Users</h4>
                <Button
                    variant="primary"
                    onClick={handleAddUser}
                    className="d-block mx-auto mx-sm-0 my-3 my-sm-0"
                >
                    Add User
                </Button>
                <Button
                    variant="danger"
                    className="d-block mx-auto mx-sm-0 mb-3 mb-sm-0"
                    onClick={handleDeleteAllUsers}
                    disabled={data.length === 0}
                >
                    Delete All
                </Button>
            </div>
            <div className="border rounded">
            {
                data.length !== 0 ?
                <Table
                    responsive
                    hover
                    borderless
                    cellPadding={0}
                    cellSpacing={0}
                >
                    <thead className="bg-dark text-light">
                        <tr className="noselect rounded">
                            <th
                                scope="col"
                                onClick={() => handleSort("id")}
                                className="table-header"
                            >
                                ID
                                {
                                lastHeaderSorted === "id" ?
                                    isSorted ? <span> &#8897;</span> : <span> &#8896;</span>
                                : ""
                            }
                            </th>

                            <th
                                scope="col"
                                onClick={() => handleSort("name")}
                                className="table-header"
                            >
                                Name
                            {
                                lastHeaderSorted === "name" ?
                                    isSorted ? <span> &#8897;</span> : <span> &#8896;</span>
                                : ""
                            }
                            </th>

                            <th
                                scope="col"
                                onClick={() => handleSort("username")}
                                className="table-header"
                            >
                                Username
                                {
                                    lastHeaderSorted === "username" ?
                                        isSorted ? <span> &#8897;</span> : <span> &#8896;</span>
                                    : ""
                                }
                            </th>

                            <th
                                scope="col"
                                onClick={() => handleSort("email")}
                                className="table-header"
                            >
                                Email
                                {
                                    lastHeaderSorted === "email" ?
                                        isSorted ? <span> &#8897;</span> : <span> &#8896;</span>
                                    : ""
                                }
                            </th>

                            <th
                                scope="col"
                                onClick={() => handleSort("city")}
                                className="table-header"
                            >
                                City
                                {
                                    lastHeaderSorted === "city" ?
                                        isSorted ? <span> &#8897;</span> : <span> &#8896;</span>
                                    : ""
                                }
                            </th>

                            <th
                                scope="col"
                                className="text-center"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email.toLowerCase()}</td>
                                    <td>{user.address.city}</td>
                                    <td className="d-flex justify-content-center">
                                        <Button
                                            as={Link}
                                            to={`/edit/${user.id}`}
                                            variant="warning"
                                            size="sm"
                                            className="me-2 px-3 fw-bold"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteButton(user)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                :
                <div className="my-5 text-center">
                    There is no user data available.
                </div>
            }
            </div>
        </div>
        <ConfirmModal
            handleDeleteUser={handleDeleteUser}
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            userToDelete={userToDelete}
            setUserToDelete={setUserToDelete}
        />
    </>;
}
