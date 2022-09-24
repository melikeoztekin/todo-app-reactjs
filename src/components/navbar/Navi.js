import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Navi = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <img
              alt=""
              src="https://cdn.iconscout.com/icon/free/png-256/inbox-348-722710.png"
              width="30"
              height="30"
              className="d-inline-block align-top mx-2"
            />
            To Do App
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
export default Navi;
