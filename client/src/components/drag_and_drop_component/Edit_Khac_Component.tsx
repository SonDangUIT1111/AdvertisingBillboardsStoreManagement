import { formatCurrency } from "../../utils/formatCurrency";

export type BillKhacEditProps = {
  price: number;
  total: number;
  amount: number;
  name: string;
  phoneNumber: string;
  note: string;
  state: string;
  handleEdit: (e: React.FormEvent) => void;
  handleCalculate: React.MouseEventHandler<HTMLButtonElement>;
  setChoseWhat: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

export function Edit_Khac_Component({
  price,
  total,
  amount,
  name,
  phoneNumber,
  note,
  state,
  setChoseWhat,
  setState,
  setAmount,
  setPhoneNumber,
  setName,
  setNote,
  setPrice,
  handleEdit,
  handleCalculate,
}: BillKhacEditProps) {
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
            disabled={state !== "Chưa xong" ? true : false}
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
            disabled={state !== "Chưa xong" ? true : false}
          ></textarea>
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
            disabled={state !== "Chưa xong" ? true : false}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
        </div>
        <div className="input-group mb-3 bolder-border">
          <div className="input-group-prepend">
            <span
              className="input-group-text span-of-input-group"
              id="basic-addon1"
            >
              Đơn giá/ cái:
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
            required
            value={price}
            disabled={state !== "Chưa xong" ? true : false}
            onChange={(e) => {
              setPrice(e.target.valueAsNumber);
            }}
          />
        </div>
        <div className="input-group mb-3 bolder-border">
          <div className="input-group-prepend">
            <span
              className="input-group-text span-of-input-group"
              id="basic-addon1"
            >
              Tổng cộng:
            </span>
          </div>
          <span
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          >
            {formatCurrency(total)}
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
