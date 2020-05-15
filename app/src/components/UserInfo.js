import React from 'react';
import './UserInfo.css';
import { Button, Form, FormControl, Navbar } from "react-bootstrap";

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.givenUsername=""
        this.playerLevel=0
        this.state = {
            username: '',
            isUserGiven: false,
            userData: [],
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
        this.givenUsername = this.state.username
        fetch('/user?username=' + encodeURIComponent(this.state.username))
            .then(res => res.json())
            .then(data => this.setState({userData: data}))
        this.setState({isUserGiven : true})
        this.state.userData.map(result => {this.playerLevel=result.data.level})
    }
    render() {
        return (
            <div>
                <Navbar className="bg-light justify-content-between" >
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Form inline onSubmit={this.handleUsername}>
                        <FormControl
                            type="text"
                            placeholder="Enter Username"
                            autoFocus
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                            className="mr sm-2"
                        />
                        <Button type="Submit">Submit</Button>
                    </Form>
                </Navbar>
                {this.state.isUserGiven && 
                <div className = "user-info">
                    <h1>{this.givenUsername}</h1>
                    <p>{this.playerLevel}</p>
                </div>}
            </div>
          )
    }
}

export default UserInfo