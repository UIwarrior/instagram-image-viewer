import React from "react";
import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '16px 32px 24px',
  },
});


class ModalComponent extends React.Component {

  constructor(props){
    super(props);
    console.log("props", props);
    this.state = {
      modalStyle: this.getModalStyle()
    }
  }

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  getModalStyle() {
    const top = 50 + this.rand();
    const left = 50 + this.rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render(props) {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
       >
            <div style={this.state.modalStyle} className={this.props.classes.paper}>
  
        {this.props.children}
        </div>
      </Modal>
    );
  }

};

export default withStyles(styles)(ModalComponent);