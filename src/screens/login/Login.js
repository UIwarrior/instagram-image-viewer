import React, { Component } from "react";
import LoginCard from "../../common/card";
import Header from "../../common/header/header";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {},
    };
    console.log(this.props, "props.login")
  }

  render() {
    return (
      <div>
        <Header logoName = "Image Viewer"/>
        <LoginCard history = {this.props.history}/>
      </div>
    );
  }
}

export default Login;
