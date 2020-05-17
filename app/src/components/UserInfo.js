import React from 'react';
import './UserInfo.css';
import { Button, Form, FormControl, Navbar, Table, Container, Col } from "react-bootstrap";

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.givenUsername = ""
        this.state = {
            data: {},
            username: '',
            isLoaded: false,
        }
        this.validateUser = this.validateUser.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    validateUser() {
        return this.state.username.length > 0;
    }
    handleUsername(event) {
        event.preventDefault();
        this.givenUsername = this.state.username
        fetch('/user?username=' + encodeURIComponent(this.state.username))
            .then(res => res.json())
            .then(data => this.setState({ data: JSON.parse(data) }, this.loadData))
    }
    loadData() {
        if (this.state.data.status === 'Success') {
            console.log("Setting state to loaded")
            this.setState({ isLoaded: true })
        }
        else {
            console.log("Setting state to NOT loaded")
            this.setState({ isLoaded: false })
        }
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
                        <Button type="Submit">Fetch Stats</Button>
                    </Form>
                </Navbar>
                {this.state.isLoaded &&
                    <div className="user-info">
                        {/* need to add a delay */}
                        <h1>{this.givenUsername}</h1>
                        <Container>
                            <Col>
                                <Table bordered size="sm" variant="dark">
                                    <tbody>
                                        <tr>
                                            <td>Level: </td>
                                            <td>{this.state.data.level}</td>
                                        </tr>
                                        <tr>
                                            <td>KDR: </td>
                                            <td>{this.state.data.killDeathRatio}</td>
                                        </tr>
                                        <tr>
                                            <td>SPM: </td>
                                            <td>{this.state.data.scorePerMinute}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Container>

                    </div>}
            </div>
        )
    }
}

export default UserInfo