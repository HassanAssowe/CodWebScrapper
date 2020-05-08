import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, FormControl } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginStatus: '',
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
        {this.state.loginStatus === "Fail" && <p id="loginError">Wrong Credentials</p>}
      </div>
    )
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
