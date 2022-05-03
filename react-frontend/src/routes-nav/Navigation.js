import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  
  return (
    <Navbar expand="lg">
        <Nav className="Navigation navbar navbar-custom navbar-expand-md navbar-dark bg-dark">
            <NavbarBrand as={Link} className="brand" to="/" >Jobly</NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                {currentUser &&
                    <div className="navbar-nav mr-auto">
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/companies" >Companies</NavLink>
                        </Nav.Item>
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/jobs" >Jobs</NavLink>
                        </Nav.Item>
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/applications" >Applications</NavLink>
                        </Nav.Item>
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/profile" >Profile</NavLink>
                        </Nav.Item>
                        <Nav.Item className="nav-item mr-4">
                            <a className="nav-link" href="/" onClick={logout}>Log out {currentUser.username}</a>
                        </Nav.Item>
                    </div>}
                {!currentUser &&
                    <div className="navbar-nav mr-auto">
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/login">Login</NavLink>
                        </Nav.Item>
                        <Nav.Item className="nav-item mr-4">
                            <NavLink className="nav-link" exact to="/signup">Sign Up</NavLink>
                        </Nav.Item>
                    </div>
                }
            </Navbar.Collapse>
        </Nav>
    </Navbar>
)
}

export default Navigation;
