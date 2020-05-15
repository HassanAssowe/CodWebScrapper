import React from 'react';
import './UserInfo.css';
import { Button, FormGroup, FormControl, Navbar, Nav } from "react-bootstrap";

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
        // console.log(encodeURIComponent(this.state.username))
        console.log(this.state.username)
        fetch('/user?username=' + encodeURIComponent(this.state.username))
            .then(res => res.json())
            .then(data => { console.log(data) })
    }
    render() {
        return (
            <Navbar className="bg-light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <form onSubmit={this.handleUsername}>
                        <FormGroup controlId="username">
                            <FormControl
                                autoFocus
                                type="text"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </form>
                </Nav>
            </Navbar>
        )
    }
}

export default UserInfo