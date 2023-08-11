import { Col, Container, Row } from "react-bootstrap";
import { HoaDonType } from "../components/HoaDonType";

export function HoaDon() {
  return (
    <Row md={3} xs={1} lg={3} sm={2} xl={4} className="g-3">
      <Col>
        <HoaDonType
          image={
            "https://mucinthanhdat.com/image/cache/catalog/In%20chuyen%20nhiet/decal-nhiet-pu-mau-xanh-la-500x500.jpg"
          }
          title={"Decal"}
        />
      </Col>
      <Col>
        <HoaDonType
          image={
            "https://inanbinhduong.vn/Content/images/products/QC00/QC06/QC04002/bang-ron-hiflex-1st-202205030924.jpg"
          }
          title={"Băng rôn"}
        />
      </Col>
      <Col>
        <HoaDonType
          image={
            "http://motminhlamhet.com/wp-content/uploads/2020/06/cdb54a1ced03175d4e12-900x900.jpg"
          }
          title={"Bảng hiệu"}
        />
      </Col>
      <Col>
        <HoaDonType
          image={"http://truongthinhad.com/data/bang-hieu-hop-den.jpg"}
          title={"Hộp đèn"}
        />
      </Col>
      <Col>
        <HoaDonType
          image={
            "https://inbaolong.com/wp-content/uploads/2022/03/a%CC%89nh-chu%CC%A3p-ma%CC%80n-hi%CC%80nh-2022-03-16-lu%CC%81c-13_optimized.21.07.png"
          }
          title={"Tân hôn"}
        />
      </Col>
      <Col>
        <HoaDonType
          image={
            "https://toanphat.com/media/product/6983_decal_de_trang_a4.jpg"
          }
          title={"Khác"}
        />
      </Col>
    </Row>
  );
}
