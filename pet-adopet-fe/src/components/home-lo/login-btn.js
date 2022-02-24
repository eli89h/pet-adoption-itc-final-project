import React, { useState } from "react";
import SignupModal from "./signup-modal";

export default function LoginBtn() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={handleShow}>
        Login
      </button>
      <SignupModal show={show} onClose={handleClose} />
    </div>
  );
}
