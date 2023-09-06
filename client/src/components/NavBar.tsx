import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../styles/styles.css";
import imageToAdd from "../styles/images/logo-thaison-art2.png";
export function NavBar() {
  return (
    <Navbar
      sticky="top"
      className="shadow-sm mb-3"
      style={{ background: "#FFFFFF" }}
    >
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
          <Nav.Link as={NavLink} to={"/khachhang"}>
            Khách hàng
          </Nav.Link>
        </Nav>
        <img
          src={imageToAdd}
          alt="Image"
          style={{ width: "50px", height: "50px" }}
        ></img>
      </Container>
    </Navbar>
  );
}
