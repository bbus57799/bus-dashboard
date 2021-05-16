import { Modal } from "react-bootstrap";
import { addAuth } from "../AuthProvider";
import AddUserForm from "./AddUserForm";

function AddUserModal({ authInfo, onClose, ...rst }) {
  const onSubmit = async (info) => {
    await authInfo.signup(info);
    onClose();
  };

  return (
    <Modal
      onHide={onClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...rst}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUserForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
}

export default addAuth(AddUserModal);
