import React, { Component } from "react";
import Header from "../../common/header/header";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
import SignIn from "../../common/form/index";

//hardcoded credentials
export const credentials  = {
  username: "arnabsadhya",
  password: "sadhyatemp",
  accessToken:"IGQVJYaTJyQ0k2ZAW03VGhxd0pUSHpyNlpUaWZAVdEpJMVNrZAmlFbk9tNXE2NUtrQk9IUG9nTzNrNC1vZADVWU0ljbThfVDVFNHJRX2tDOGpEaUZArMllQQS1UR2RzaW81MWhJdHl3dzZAUU21mc1Q2ZAC1OMnRyUkJvVFhWZAjgw"
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
class Login extends Component {
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
