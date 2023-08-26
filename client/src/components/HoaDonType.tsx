import "../styles/styles.css";

type HoaDonTypeProps = {
  image: string;
  title: string;
};

export function HoaDonType({ image, title }: HoaDonTypeProps) {
  return (
    <>
      <div
        className="card card-type"
        style={{ width: 252, height: 260, transition: "0.2s" }}
      >
        {title === "Decal" ? (
          <a href={`/hoadon/decal`} className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : title === "Băng rôn" ? (
          <a href={`/hoadon/bangron`} className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : title === "Bảng hiệu" ? (
          <a href={`/hoadon/banghieu`} className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : title === "Hộp đèn" ? (
          <a className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : title === "Tân hôn" ? (
          <a className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : title === "Khác" ? (
          <a className="a-art-type">
            <img
              alt=""
              className="card-img-top"
              style={{ width: 250, height: 200, objectFit: "cover" }}
              src={image}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {title}
              </h5>
            </div>
          </a>
        ) : (
          <button>7</button>
        )}
      </div>
    </>
  );
}
