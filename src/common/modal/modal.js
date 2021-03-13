import React from "react";
import { Modal } from "@material-ui/core";

const ModalComponent = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {props.children}
    </Modal>
  );
};

export default ModalComponent;