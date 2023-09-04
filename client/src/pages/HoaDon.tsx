import { Col, Container, Row } from "react-bootstrap";
import { HoaDonType } from "../components/HoaDonType";
import imageToAdd1 from "../styles/images/type-decal.jpg";
import imageToAdd2 from "../styles/images/type-bangron.jpg";
import imageToAdd3 from "../styles/images/type-banghieu.jpg";
import imageToAdd4 from "../styles/images/type-hopden.jpg";
import imageToAdd5 from "../styles/images/type-damcuoi.png";
import imageToAdd6 from "../styles/images/type-khac.jpg";
export function HoaDon() {
  return (
    <Row md={3} xs={1} lg={3} sm={2} xl={4} className="g-3">
      <Col>
        <HoaDonType image={imageToAdd1} title={"Decal"} />
      </Col>
      <Col>
        <HoaDonType image={imageToAdd2} title={"Băng rôn"} />
      </Col>
      <Col>
        <HoaDonType image={imageToAdd3} title={"Bảng hiệu"} />
      </Col>
      <Col>
        <HoaDonType image={imageToAdd6} title={"Khác"} />
      </Col>
      {/* <Col>
        <HoaDonType image={imageToAdd4} title={"Hộp đèn"} />
      </Col>
      <Col>
        <HoaDonType image={imageToAdd5} title={"Tân hôn"} />
      </Col> */}
    </Row>
  );
}
