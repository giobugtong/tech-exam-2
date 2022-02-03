import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteAll } from '../actions';

export default function ConfirmModal(props) {
    const { showConfirmModal, setShowConfirmModal, handleDeleteUser, userToDelete } = props;
    const dispatch = useDispatch();

    const handleHideModal = () => {
        setShowConfirmModal(false);
    }

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

    const handleConfirmDeleteButton = () => {
        if (userToDelete === null) {
            dispatch(deleteAll());
            setShowConfirmModal(false);
            return Toast.fire({
                html: `
                    <span>Successfully deleted all users.</span>
                `,
                icon: "success"
            });
        }
        return handleDeleteUser();
    }

  return <>
      <Modal centered show={showConfirmModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete{userToDelete === null && " ALL"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-4">
            {
                userToDelete === null ?
                <span>
                    Are you sure you want to delete <b>ALL</b> users?
                </span>
                :
                <span>
                    Are you sure you want to delete <b>{userToDelete.username}</b> from the user list?
                </span>
            }
            </div>
            <div className="d-flex justify-content-between justify-content-md-end">
                <Button
                    variant="outline-secondary"
                    className="px-3 me-md-3"
                    onClick={handleHideModal}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    className="px-3"
                    onClick={handleConfirmDeleteButton}
                >
                    Delete{userToDelete === null && " All"}
                </Button>
            </div>
        </Modal.Body>
      </Modal>
  </>;
}
