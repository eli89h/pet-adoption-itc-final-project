import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Signup from "./signup-form/signup";
import Login from "./login-form/login";
//import AppContext from "../../context/AppContext";
//import { useHistory } from "react-router";

export default function SignupModal(props) {
  const { show, onClose } = props;
  const [showLogin, setShowLogin] = useState(false);
  //const appContext = useContext(AppContext);
  //const history = useHistory();
  //console.log(history);

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showLogin ? <span>Signup</span> : <span>Login</span>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showLogin ? <Signup /> : <Login  />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowLogin(false)}>
            Login
          </Button>
          <Button variant="primary" onClick={() => setShowLogin(true)}>
            Signup
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
