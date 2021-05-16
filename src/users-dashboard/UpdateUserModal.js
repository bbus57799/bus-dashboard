import { Modal } from "react-bootstrap";
import { addAuth } from "../AuthProvider";
import AddUserForm from "./AddUserForm";

function AddUserModal({ authInfo, userInfo, onClose, ...rst }) {
  const onSubmit = async (info) => {
    await authInfo.updateUser(userInfo.id, info);
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
          Update a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUserForm
          initialData={userInfo}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </Modal.Body>
    </Modal>
  );
}

export default addAuth(AddUserModal);
