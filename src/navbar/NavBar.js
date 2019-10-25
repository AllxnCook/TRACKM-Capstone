import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import './NavBar.css'


//handling navbar links and title

class NavBar extends Component {
    loginFormHandler = (form) => {
        form.preventDefault()
        this.props.history.push("/signin")
    }
    render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/trackmlogo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {'TRACKM'}
                    </Navbar.Brand>
                    <Link to="signin"><Button className="nav-button" type="submit" variant="secondary">
                        Sign In</Button></Link>
                    <Link to="/register"><Button className="nav-button" type="submit" variant="secondary">
                        Register</Button></Link>
                    <Nav.Item bg="dark">
                        <Nav.Link href="/trips">TRIPS</Nav.Link>
                    </Nav.Item>
                </Navbar>
            </header>
        )
    }
}
export default NavBar;