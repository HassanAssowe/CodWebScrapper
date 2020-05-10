import React from 'react';
import './UserInfo.css';
import { Button, FormGroup, FormControl } from "react-bootstrap";

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
        this.validateUser = this.validateUser.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
    }

    validateUser() {
        return this.state.username.length > 0;
    }
    handleUsername(event) {
        event.preventDefault();
        console.log(this.state.username)
        fetch('/user?username=' + this.state.username)
            .then(res => res.json())
            .then(data => { console.log(data) })
    }
    render() {
        return (
            <div className="user-info">
                <form onSumbit={this.handleUsername}>
                    <FormGroup controlId="username">
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
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

export default UserInfo