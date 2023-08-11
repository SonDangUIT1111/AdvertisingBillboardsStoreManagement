type HoaDonTypeProps = {
  image: string;
  title: string;
};

import "../styles/styles.css";

export function HoaDonType({ image, title }: HoaDonTypeProps) {
  function ForwardPage() {
    switch (title) {
      case "Decal":
        alert("1");
        break;
      case "Băng rôn":
        alert("2");
        break;
      case "Bảng hiệu":
        alert("3");
        break;
      case "Hộp đèn":
        alert("4");
        break;
      case "Tân hôn":
        alert("5");
        break;
      case "Khác":
        alert("6");
        break;
    }
  }

  return (
    <>
      <div
        className="card card-type"
        style={{ width: 252, height: 260, transition: "0.2s" }}
      >
        {title === "Decal" ? (
          <a href={`/hoadon/decal`} className="a-art-type">
            <img
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
          <a className="a-art-type">
            <img
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
          <a className="a-art-type">
            <img
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
