import { Modal } from "react-bootstrap";
import { firestore } from "../firebase";
import BusForm from "./BusForm";

function BusModal({ authInfo, onClose, ...rst }) {
  const onSubmit = async (info) => {
    await firestore.collection("buses").doc(info.id).set({
      name: info.name,
      driverName: info.driverName,
    });
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
        <Modal.Title id="contained-modal-title-vcenter">Add a bus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BusForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
}

export default BusModal;
