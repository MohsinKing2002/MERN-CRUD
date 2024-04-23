import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadUser } from "../Actions/User";

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Navbar
        className="nav_bar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img
              style={{ height: "5vh", borderRadius: "50px" }}
              src="https://camo.githubusercontent.com/8a7dd5f109ad506e08c072e7e59c78839d265e9c58cfab68d62978c006208461/68747470733a2f2f696d6775722e636f6d2f797230736673522e706e67"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? null : (
                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
              )}

              {isAuthenticated ? (
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
              ) : null}
              {isAuthenticated ? (
                <Nav.Link as={NavLink} to="/search">
                  Search
                </Nav.Link>
              ) : null}
              {isAuthenticated ? (
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
              ) : null}
              {isAuthenticated ? (
                <Nav.Link as={NavLink} to="/account">
                  Account
                </Nav.Link>
              ) : null}
              {isAuthenticated ? (
                <Nav.Link as={NavLink} to="/message">
                  Message
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
