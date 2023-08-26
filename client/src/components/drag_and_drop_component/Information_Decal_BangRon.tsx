import { formatCurrency } from "../../utils/formatCurrency";

export type BillDecal_BangRonInfoProps = {
  imageData: string;
  price: number;
  total: number;
  amount: number;
  name: string;
  handleChangePhone: (e: string) => void;
  handleAdd: (e: React.FormEvent) => void;
  handleCalculate: React.MouseEventHandler<HTMLButtonElement>;
  handleCalculateWithDiscount: (e: number) => void;
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

export function Information_Decal_BangRon({
  imageData,
  price,
  total,
  amount,
  name,
  setAmount,
  setPhoneNumber,
  setName,
  setNote,
  setHeight,
  setWidth,
  setPrice,
  setDiscount,
  setDeposit,
  handleChangePhone,
  handleAdd,
  handleCalculate,
  handleCalculateWithDiscount,
}: BillDecal_BangRonInfoProps) {
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
                required
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
                required
                aria-describedby="basic-addon1"
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
                aria-describedby="basic-addon1"
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
