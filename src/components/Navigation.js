import { Nav, Navbar } from 'react-bootstrap';
import React from 'react'



export default function Navigation() {
    return (
        <Navbar bg="navbar" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt="Repentance challenge generator"
                    src={require('../img/header.png').default}
                    width="450"
                    height="250"
                    className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link className="ml-lg-5 p-4 navbar-item text-center" href="/">Home</Nav.Link>
                <Nav.Link className="p-4 navbar-item" href="RulesCharacters">Rules and Characters</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
