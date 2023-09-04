import { formatCurrency } from "../../utils/formatCurrency";

export type BillKhacInfoProps = {
  price: number;
  total: number;
  amount: number;
  name: string;
  handleChangePhone: (e: string) => void;
  handleAdd: (e: React.FormEvent) => void;
  handleCalculate: React.MouseEventHandler<HTMLButtonElement>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

export function Information_Khac({
  price,
  total,
  amount,
  name,
  setAmount,
  setPhoneNumber,
  setName,
  setNote,
  setPrice,
  handleChangePhone,
  handleAdd,
  handleCalculate,
}: BillKhacInfoProps) {
  return (
    <>
      <form onSubmit={(e) => handleAdd(e)}>
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
            required
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleChangePhone(e.target.value);
            }}
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
            value={name}
            aria-describedby="basic-addon1"
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setNote(e.target.value)}
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
