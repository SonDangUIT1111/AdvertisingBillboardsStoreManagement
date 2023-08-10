type HoaDonTypeProps = {
  image: string;
  title: string;
};

import "../styles/styles.css";

export function HoaDonType({ image, title }: HoaDonTypeProps) {
  return (
    <>
      <div
        className="card card-type"
        style={{ width: 252, height: 260, transition: "0.2s" }}
      >
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
      </div>
    </>
  );
}
