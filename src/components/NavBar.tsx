import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../styles/styles.css";
export function NavBar() {
  return (
    <Navbar sticky="top" className="bg-light shadow-sm mb-3 d-flex">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={"/"}>
            Trang Chủ
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/hoadon"}>
            Hóa Đơn
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/nhaphang"}>
            Nhập hàng
          </Nav.Link>
        </Nav>
        <span>Hello</span>
      </Container>
    </Navbar>
  );
}
