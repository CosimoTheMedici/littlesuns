import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalComponent({
  modalTitle,
  modalBody,
  modalFooter,
  modalState,
  handleClose,
}) {
  return (
    <>
      <Modal show={modalState} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>{modalFooter}</Modal.Footer>
      </Modal>
    </>
  );
}



export  function ModalLargeComponent({
  modalTitle,
  modalBody,
  modalFooter,
  modalState,
  handleClose,
}) {
  return (
    <>
      <Modal show={modalState} onHide={handleClose} animation={false} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}
