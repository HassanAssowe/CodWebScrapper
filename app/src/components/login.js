import React from 'react';
import './login.css';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginStatus: '',
      username: '',
    }
    this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  };
  handleSubmit(event) {
    event.preventDefault();
    fetch('/login?email=' + this.state.email + '&password=' + this.state.password)
      .then(res => res.json())
      .then(data => { this.setState({ loginStatus: data }) })
  };

  render() {
    if (this.state.loginStatus === "Success"){
      return (<Redirect to="/UserInfo" />)
    }
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormControl
              value={this.state.password}
              placeholder="Enter Password"
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} type="submit">
            Login
            </Button>
        </form>
        {this.state.loginStatus === "Fail" && <p id="loginError">Unable to Verify Credentials</p>}
      </div>
    )
  }
}

export default Login