import React, { Component } from "react";
import Header from "../../common/header/header";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
// import "./index.css";
import SignIn from "../../common/form/index";

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

    return (
      <div>
        <Header logoName="Image Viewer" />
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
