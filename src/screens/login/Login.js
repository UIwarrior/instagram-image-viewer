import React, { Component } from "react";
import Header from "../../common/header/header";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
// import "./index.css";
import SignIn from "../../common/form/index";

export const credentials  = {
  username: "arnabsadhya",
  password: "sadhyatemp",
  accessToken:"IGQVJXZAlVxczVsX3BqM1dLMTRCaWZA6ZAVMtUXFZAWXVWU1otX1VsbmxCRGNWZAHgyYnhHbTBUZAnFzUWJqd2ZABTTdNMFRrUFpZAbVdvd3BxZAnpCUDdMQ0t2Nm1kVlNGcFVTZA2VySUdhTDUwSng2RzZA2TnNzTjhZAdDhHVmliOUVR"
}

const styles = {
  root: {
    minWidth: 275,
  },
  loginContainer: {
    margin: 'auto',
    width: 500
  }
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {},
    };
  }

  render() {
    const { classes, history } = this.props;
    console.log("this.props", this.props);
    return (
      <div>
        <Header logoName="Image Viewer"  history={history}/>
        <div className={classes.loginContainer}>
          <Card className={classes.root}>
            <CardContent>
              <SignIn history={history} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
