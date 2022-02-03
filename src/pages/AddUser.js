import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addUser } from '../actions';

export default function AddUser() {

  const data = useSelector(state => state);
  const navigate = useNavigate();
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
    const duplicateEmail = data.find(user => user.email.toLowerCase() === email.toLowerCase()) || false;
    const duplicateUsername = data.find(user => user.username === username) || false;
    if (duplicateEmail) {
      return Toast.fire({
        html: `
          <span>This email is already taken. Please enter a different one.</span>
        `,
        icon: "info"
      })
    }
    if (duplicateUsername) {
      return Toast.fire({
        html: `
          <span>This username is already taken. Please enter a different one.</span>
        `,
        icon: "info"
      })
    }
    const handleId = () => {
      if (data.length !== 0) {
        const mapped = data.map(user => {
          return parseInt(user.id);
        });
        const newId = Math.max(...mapped);
        return newId + 1
      }
      return 1;
    }
    const user = {
      username,
      name,
      email,
      address: {
        city
      },
      id: handleId()
    }
    dispatch(addUser(user));
    Toast.fire({
      html: `
        <span>User added successfully!</span>
      `,
      icon: "success"
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return <>
      <h1 className="text-center">Dashboard</h1>
      <div className="mt-4 p-4 bg-light border rounded mx-auto shadow-sm" style={{ maxWidth: "700px" }}>
        <h5>Add a new user</h5>
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
                minLength={3}
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
                minLength={4}
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
                minLength={3}
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
            Submit
            </Button>
          </div>
        </Form>
      </div>
  </>;
}
