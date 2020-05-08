import React, { useState } from 'react';
import { Button, FormGroup, FormControl} from "react-bootstrap";
import './App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] =useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('/login?email='+ email+'&password='+password)
    .then(res => res.json())
    .then(data => {setState(data)})
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormControl
            autoFocus
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <FormControl
            value={password}
            placeholder="Enter Password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      {state === "Fail" && <p id="loginError">Wrong Credentials</p>}
    </div>
  )
}

export default Login;
