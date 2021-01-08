
import React from 'react';
import { headerString } from "../common/CommonStrings"
import { Navbar} from 'react-bootstrap';
export default function NaviaHeader() {
    return <header>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">{headerString}</Navbar.Brand>
        </Navbar>
    </header>;
}