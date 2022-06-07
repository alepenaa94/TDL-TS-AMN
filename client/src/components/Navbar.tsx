import React from "react";
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        <Navbar bg="secondary" expand="lg" className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <Container>
            <Link className="navbar-brand" to="/">amn games</Link>
            <Navbar.Toggle aria-controls="navbarResponsive" className="navbar-toggler text-uppercase font-weight-bold bg-white text-white rounded" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
                <NavDropdown.Item className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/ahorcado">Ahorcado</Link></NavDropdown.Item>
                <NavDropdown.Item className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/grrr">Grrr</Link></NavDropdown.Item>
                <NavDropdown.Item className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/mates">Mates</Link></NavDropdown.Item>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    
    )
}

/*

    <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
            <Link className="navbar-brand" to="/">amn games</Link>
            <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/ahorcado">Ahorcado</Link></li>
                    <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/grrr">Grrr</Link></li>
                    <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/mates">Mates</Link></li>
                </ul>
            </div>
        </div>
    </nav>

*/