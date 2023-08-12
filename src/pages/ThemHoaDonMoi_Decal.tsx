import { FileDrop } from "../components/drag_and_drop_component/FileDrop";

export function ThemHoaDonMoi_Decal() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <FileDrop />
          </div>
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
