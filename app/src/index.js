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
      username: '',
    }
    this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateUser = this.validateUser.bind(this)
    this.handleUsername =this.handleUsername.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  };

  validateUser() {
    return this.state.username.length>0;
  }
  
  handleSubmit(event) {
  event.preventDefault();
  fetch('/login?email=' + this.state.email + '&password=' + this.state.password)
    .then(res => res.json())
    .then(data => { this.setState({ loginStatus: data }) })
  };

  handleUsername(event) {
    event.preventDefault();
    fetch('/user?username='+this.state.username)
    .then(res => res.json())
    .then(data => {console.log(data)})
  }
  render() {
    if (this.state.loginStatus !== "Success") {
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
    } else {
      return(
        <div className="user-info">
          <form onSumbit={this.handleUsername}>
            <FormGroup controlId = "username">
              <FormControl
              autoFocus
              placeholder="Enter Username"
              value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              />
            </FormGroup>
            <Button block disabled={!this.validateUser()} type="submit">
              Submit
            </Button>
          </form>
        </div>
      )
    } 
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
