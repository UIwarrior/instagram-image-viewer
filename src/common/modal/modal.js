import React from "react";
import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 5,
  },
});
class ModalComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalStyle: this.getModalStyle()
    }
  }

  rand() {
    return Math.round(Math.random() * 20) - 10;
  }


  /**
   * Function to calculate top and left position for modal and set the styles for modal 
   * @returns object containing css styles
   */

  getModalStyle() {
    const top = 50 + this.rand();
    const left = 50 + this.rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      width: this.props.size  === 'lg' ? 700: 200,
      height: this.props.size  === 'lg' ? 'auto': 200,
      padding: 20
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
            {this.props.modalTitle && <h2>{this.props.modalTitle}</h2>}

        {this.props.children}
        </div>
      </Modal>
    );
  }

};

export default withStyles(styles)(ModalComponent);