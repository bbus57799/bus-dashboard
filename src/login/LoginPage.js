import { Modal } from "react-bootstrap";
import { addAuth } from "../AuthProvider";
import LoginForm from "./LoginForm";

function LoginPage({ authInfo }) {
  return (
    <Modal
      size="md"
      show
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm onLogin={authInfo.login} />
      </Modal.Body>
    </Modal>
  );
}

export default addAuth(LoginPage);
