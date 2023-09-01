import { formatCurrency } from "../../utils/formatCurrency";

export type BillDecal_BangRonEditProps = {
  price: number;
  total: number;
  amount: number;
  name: string;
  phoneNumber: string;
  note: string;
  width: number;
  height: number;
  deposit: number;
  discount: number;
  state: string;
  handleEdit: (e: React.FormEvent) => void;
  handleCalculate: React.MouseEventHandler<HTMLButtonElement>;
  handleCalculateWithDiscount: (e: number) => void;
  setChoseWhat: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setDeposit: React.Dispatch<React.SetStateAction<number>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

export function Edit_Decal_BangRon_Component({
  price,
  total,
  amount,
  name,
  phoneNumber,
  note,
  width,
  height,
  deposit,
  discount,
  state,
  setChoseWhat,
  setState,
  setAmount,
  setPhoneNumber,
  setName,
  setNote,
  setHeight,
  setWidth,
  setPrice,
  setDiscount,
  setDeposit,
  handleEdit,
  handleCalculate,
  handleCalculateWithDiscount,
}: BillDecal_BangRonEditProps) {
  return (
    <>
      <form onSubmit={(e) => handleEdit(e)}>
        <div className="input-group mb-3 bolder-border">
          <div className="input-group-prepend">
            <span
              className="input-group-text span-of-input-group"
              id="basic-addon1"
            >
              Điện thoại:
            </span>
          </div>
          <span
            className="form-control bg-light"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          >
            {phoneNumber}
          </span>
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
            value={name}
            aria-describedby="basic-addon1"
            onChange={(e) => setName(e.target.value)}
            disabled={state === "Thanh toán" ? true : false}
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={state === "Thanh toán" ? true : false}
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
                value={width}
                aria-describedby="basic-addon1"
                required
                disabled={state === "Thanh toán" ? true : false}
                onChange={(e) => setWidth(e.target.valueAsNumber)}
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
                value={height}
                required
                aria-describedby="basic-addon1"
                disabled={state === "Thanh toán" ? true : false}
                onChange={(e) => setHeight(e.target.valueAsNumber)}
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
              Số lượng:
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            value={amount}
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
            disabled={state === "Thanh toán" ? true : false}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
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
          >
            {formatCurrency(price)}
          </span>
          <button
            className="btn btn-light"
            type="button"
            onClick={handleCalculate}
          >
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
                value={discount}
                aria-describedby="basic-addon1"
                disabled={state === "Thanh toán" ? true : false}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setDiscount(0);
                    handleCalculateWithDiscount(0);
                    return;
                  }
                  setDiscount(e.target.valueAsNumber);
                  handleCalculateWithDiscount(e.target.valueAsNumber);
                }}
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
                value={deposit}
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                disabled={state === "Thanh toán" ? true : false}
                onChange={(e) => setDeposit(e.target.valueAsNumber)}
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
          Thành tiền: {formatCurrency(total)}
        </div>
        <hr />
        <div className="row" style={{ color: "#2FB872", fontWeight: 500 }}>
          <div className="col">
            {state === "Hoàn thành" || state === "Thanh toán" ? (
              <button
                type="button"
                className="btn btn-primary m-1"
                style={{ width: "100%" }}
              >
                Đã hoàn thành
              </button>
            ) : (
              <button
                type="button"
                style={{ width: "100%" }}
                className="btn btn-outline-primary m-1"
                onClick={(e) => {
                  setState("Hoàn thành");
                  setChoseWhat("Hoàn thành");
                }}
              >
                Đã hoàn thành
              </button>
            )}
          </div>

          <div className="col">
            {state === "Thanh toán" ? (
              <button
                type="button"
                className="btn btn-success m-1"
                style={{ width: "100%" }}
              >
                Đã thanh toán
              </button>
            ) : (
              <button
                type="button"
                style={{ width: "100%" }}
                className="btn btn-outline-success m-1"
                onClick={(e) => {
                  setState("Thanh toán");
                  setChoseWhat("Thanh toán");
                }}
              >
                Đã thanh toán
              </button>
            )}
          </div>
        </div>
        <hr />
        <input
          type="submit"
          className="btn btn-grey"
          style={{ width: "100%" }}
          value="Xác nhận hóa đơn"
        ></input>
      </form>
    </>
  );
}
