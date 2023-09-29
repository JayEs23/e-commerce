import React from "react";
import { Button, Modal } from "react-bootstrap";

const CheckAuthModal = ({ showAuthModal, setShowAuthModal, message }) => {
  return (
    <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Authentication Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-primary">{message}.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShowAuthModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckAuthModal;
