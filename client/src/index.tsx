import React from "react";
import ReactDOM from "react-dom/client";

import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

const navbar = (
    <nav>
        <ul>
          <li>AMN GAMES</li>
          <li>Desarrollo</li>
          <li>Acerca de</li>
          <li>Contacto</li>
        </ul>
    </nav>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

        <div>
            <Navbar />
            { navbar }
        </div> 
)