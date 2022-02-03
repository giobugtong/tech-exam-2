import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editUser } from '../actions';

export default function EditUser() {
    
    const { userId } = useParams(); 
    const navigate = useNavigate();
    const data = useSelector(state => state);
    const dispatch = useDispatch();

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
    })

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = data.filter(user => parseInt(user.id) !== parseInt(userId));
        const sameUsername = filtered.find(user => user.username === username);
        const sameEmail = filtered.find(user => user.email === email);
        if (sameUsername) {
            return Toast.fire({
                html: `
                    <span>This username is already taken. Please try a different one.</span>
                `,
                icon: "warning"
            });
        };
        if (sameEmail) {
            return Toast.fire({
                html: `
                    <span>This email is already taken. Please try a different one.</span>
                `,
                icon: "warning"
            });
        };
        const payload = {
            username,
            name,
            email,
            address: {
                city
            },
            id: userId
        };
        dispatch(editUser(payload));
        navigate("/");
        Toast.fire({
            html: `
                <span>Successfully updated user details.</span>
            `,
            icon: "success"
        });
    };

    const handleCancel = () => {
        navigate("/");
        setUsername("");
        setName("");
        setEmail("");
        setCity("");
    };

    useEffect(() => {
        const foundUser = data.find(user => parseInt(userId) === parseInt(user.id)) || false;
        if (!foundUser) {
            navigate("/");
            Toast.fire({
                html: `
                    <span>User with ID of ${userId} does not exist.</span>
                `,
                icon: "warning"
            })
        } else {
            setUsername(foundUser.username);
            setName(foundUser.name);
            setEmail(foundUser.email);
            setCity(foundUser.address.city);
        }
    }, []);


  return <>
      <h1 className="text-center">Dashboard</h1>
      <div className="mt-4 p-4 bg-light border rounded mx-auto shadow-sm" style={{ maxWidth: "700px" }}>
        <h5>Edit user</h5>
        <div className="border-bottom"></div>
        <Form
          onSubmit={handleSubmit}
          className="mt-3"
        >
          <div className="d-sm-flex justify-content-between">
            <FloatingLabel
              controlId="floatingInputName"
              label="Name"
              className="mb-2 w-100 me-sm-2"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputUsername"
              label="Username"
              className="mb-2 w-100"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div className="d-sm-flex justify-content-between">
            <FloatingLabel
              controlId="floatingInputEmail"
              label="Email address"
              className="mb-2 w-100 me-sm-2"
            >
              <Form.Control
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputCity"
              label="City"
              className="mb-2 w-100"
            >
              <Form.Control
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div className="d-flex justify-content-between justify-content-sm-end mt-4">
            <Button
              variant="outline-danger"
              className="px-4 fw-bold me-sm-4"
              onClick={handleCancel}
            >
            Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              className="px-4 fw-bold"
            >
            Update
            </Button>
          </div>
        </Form>
      </div>
  </>;
}
