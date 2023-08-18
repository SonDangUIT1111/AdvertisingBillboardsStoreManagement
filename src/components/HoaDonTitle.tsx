import "../styles/styles.css";
type Props = {
  handleSort: React.MouseEventHandler<HTMLButtonElement>;
};
export function HoaDonTitle({ handleSort }: Props) {
  return (
    <>
      <div
        className="d-flex flex-row align-content-center"
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          Điện thoại
        </span>
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          Khách hàng
        </span>
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          Nội dung
        </span>
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          Ngày đặt
        </span>
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          {" "}
          Đơn giá
        </span>
        <span
          className="mt-2 text-left"
          style={{ width: "12%", fontWeight: 500 }}
        >
          Trạng thái
        </span>
        <div
          className="d-flex flex-row"
          style={{ visibility: "collapse", width: "28%" }}
        >
          <button type="button" className="btn btn-primary m-1">
            Hoàn thành
          </button>
          <button type="button" className="btn btn-success m-1">
            Thanh toán
          </button>
          <button type="button" className="btn btn-info m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-secondary m-1"
            style={{ visibility: "visible" }}
            onClick={handleSort}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-sort-up"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
            </svg>
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
