import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { credentials } from '../../screens/login/Login';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
  },
  submit: {
    margin: "20px 0px 0px 0px",
    alignSelf: 'flex-start'
  },
  title: {
    alignSelf: 'flex-start'
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: {
        required: false,
        wronguser: false,
        wrongpassword: false
      }
    };
  }

  /**
   * This method updates user name state variable, 
   * @param {*} e  - event 
   */

  updateUsername = (e) => {
    this.setState({
        username: e.target.value
    })
  }
 
  /**
   *  This method updates password state variable, 
   * @param {*} e 
   */

  updatePassword = (e) => {
    this.setState({
        password: e.target.value
    })
  }

  /**
   * This method gets invoked when we click on login button, this also validates for empty username, password and matches with credential object for correct user name/password combo
   * @returns 
   */

  submitLogin = () => {
    if(credentials){
        const { username , password } = credentials;
        if(!this.state.username || !this.state.password) {
            this.setState({
                error : {
                    required: true
                },
            });
            return;
        }
        if(username.toLowerCase() !== this.state.username.toLowerCase()) {
          this.setState({
              error: {
                  wronguser: true
              }
          })
          return;
        }
        if(password.toLowerCase() !== this.state.password.toLowerCase()){
            this.setState({
                error: {
                    wrongpassword: true
                }
            })
            return;
        }
    }
    sessionStorage.setItem('access-token', credentials.accessToken);
    sessionStorage.setItem('loggedIn', true);
    this.props.history.push("/home");
  }


  render() {
    const { classes } = this.props;

    return (
      <div component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            LOGIN
          </Typography>
            <FormControl fullWidth required>
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input error ={this.state.error.wronguser} id="component-simple"  onChange = {this.updateUsername} />
              {this.state.error.required && <FormHelperText id="component-error-text" error ={true}>Required</FormHelperText>}

            </FormControl>
            <FormControl fullWidth required>
              <InputLabel htmlFor="component-simple">Password</InputLabel>
              <Input type ="password" error ={this.state.error.wrongpassword} id="component-simple"  onChange = {this.updatePassword}  />
              {this.state.error.required && <FormHelperText error ={true} id="component-error-text">Required</FormHelperText>}

              {(this.state.error.wrongpassword || this.state.error.wronguser) && <FormHelperText error ={true} id="component-error-text">Incorrect username and/or password</FormHelperText>}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.submitLogin}
              >
              Login
            </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(SignIn);
