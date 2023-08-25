import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";

export function SuaHoaDon_BangHieu() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">{/* <FileDrop /> */}</div>
          <div className="col" style={{ marginTop: "20px" }}>
            <div className="input-group mb-3 bolder-border">
              <div className="input-group-prepend">
                <span
                  className="input-group-text span-of-input-group"
                  id="basic-addon1"
                >
                  Điện thoại:
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 bolder-border">
              <div className="input-group-prepend">
                <span
                  className="input-group-text span-of-input-group"
                  id="basic-addon1"
                >
                  Khách hàng:
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 bolder-border">
              <div className="input-group-prepend">
                <span className="input-group-text span-of-input-group">
                  Ghi chú:
                </span>
              </div>
              <textarea
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="row" style={{ color: "#000", fontWeight: 500 }}>
              <div className="col">
                <div className="input-group mb-3 bolder-border">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text span-of-input-group"
                      id="basic-addon1"
                    >
                      Ngang:
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              X
              <div className="col">
                <div className="input-group mb-3 bolder-border">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text span-of-input-group"
                      id="basic-addon1"
                    >
                      Cao:
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between flex-row mb-3">
              <h6 style={{ marginLeft: "12px" }}>Chất liệu in: </h6>
              <div className="form-check">
                <input
                  className="form-check-input checked-custom"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Chất liệu decal
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input checked-custom"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="option2"
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Chất liệu bạt
                </label>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div className="form-check form-switch mb-3 d-flex flex-row p-0">
                <h6 style={{ marginLeft: "12px" }}>Bảng có chân: </h6>
                <input
                  style={{ marginLeft: "10px" }}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
              <div className="form-check form-switch d-flex flex-row-reverse p-0">
                <input
                  style={{ marginLeft: "10px" }}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                />
                <h6 style={{ marginLeft: "12px" }}>Vận chuyển xa: </h6>
              </div>
            </div>

            <div className="input-group mb-3 bolder-border">
              <div className="input-group-prepend">
                <span
                  className="input-group-text span-of-input-group"
                  id="basic-addon1"
                >
                  Đơn giá:
                </span>
              </div>
              <span
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
              <button className="btn btn-light" type="button">
                Tính đơn giá
              </button>
            </div>
            <div className="input-group mb-3 bolder-border">
              <div className="input-group-prepend">
                <span
                  className="input-group-text span-of-input-group"
                  id="basic-addon1"
                >
                  Phí phát sinh:
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>
            <hr />
            <div className="row" style={{ color: "#2FB872", fontWeight: 500 }}>
              <div className="col">
                <div className="input-group mb-3 bolder-border">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text span-of-input-group"
                      id="basic-addon1"
                    >
                      Giảm giá:
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>

              <div className="col">
                <div className="input-group mb-3 bolder-border">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text span-of-input-group"
                      id="basic-addon1"
                    >
                      Tiền cọc:
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#000",
                fontWeight: 500,
                fontSize: "20px",
                textAlign: "right",
              }}
            >
              Thành tiền: 100.000
            </div>
            <hr />
            <div className="row" style={{ color: "#2FB872", fontWeight: 500 }}>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Đã hoàn thành
                </button>
              </div>

              <div className="col">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "100%" }}
                >
                  Đã thanh toán
                </button>
              </div>
            </div>
            <hr />
            <button
              type="button"
              className="btn btn-grey"
              style={{ width: "100%" }}
            >
              Xác nhận hóa đơn
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
