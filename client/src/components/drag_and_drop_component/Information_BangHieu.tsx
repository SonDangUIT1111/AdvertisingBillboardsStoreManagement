import { formatCurrency } from "../../utils/formatCurrency";

export type BillBangHieuInfoProps = {
  price: number;
  total: number;
  amount: number;
  name: string;
  materialType: string;
  isTwoFace: boolean;
  hasFooter: boolean;
  isDelivery: boolean;
  costIncurred: number;
  toleNumber: number;
  setMaterialType: React.Dispatch<React.SetStateAction<string>>;
  setIsTwoFace: React.Dispatch<React.SetStateAction<boolean>>;
  setToleNumber: React.Dispatch<React.SetStateAction<number>>;
  setHasFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  setCostIncurred: React.Dispatch<React.SetStateAction<number>>;
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

export function Information_BangHieu({
  price,
  total,
  amount,
  name,
  materialType,
  isTwoFace,
  hasFooter,
  isDelivery,
  costIncurred,
  toleNumber,
  setMaterialType,
  setIsTwoFace,
  setToleNumber,
  setHasFooter,
  setIsDelivery,
  setCostIncurred,
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
}: BillBangHieuInfoProps) {
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
        <div className="d-flex justify-content-between flex-row mb-3">
          <h6 style={{ marginLeft: "12px" }}>Chất liệu in: </h6>
          <div className="form-check">
            <input
              className="form-check-input checked-custom"
              type="radio"
              name="exampleRadios"
              id="decalRadio"
              value="Decal"
              required={materialType === "" ? true : false}
              onChange={(e) => {
                setMaterialType(e.target.value);
                setToleNumber(1);
              }}
            />
            <label className="form-check-label" htmlFor="decalRadio">
              Chất liệu decal
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input checked-custom"
              type="radio"
              name="exampleRadios"
              id="batRadio"
              value="Bạt"
              required={materialType === "" ? true : false}
              onChange={(e) => {
                setMaterialType(e.target.value);
                setToleNumber(0);
              }}
            />
            <label className="form-check-label" htmlFor="batRadio">
              Chất liệu bạt
            </label>
          </div>
        </div>
        {materialType === "Decal" ? (
          <div className="d-flex justify-content-between flex-row mb-3 mt-1">
            <h6 style={{ marginLeft: "12px" }}>Mặt tôn: </h6>
            <div className="form-check">
              <input
                className="form-check-input checked-custom"
                type="radio"
                name="exampleRadios2"
                id="oneToleRadio"
                value="1"
                checked={toleNumber === 1 ? true : false}
                onChange={(e) => {
                  setToleNumber(1);
                  setIsTwoFace(false);
                }}
              />
              <label className="form-check-label" htmlFor="oneToleRadio">
                1 mặt tôn
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input checked-custom"
                type="radio"
                name="exampleRadios2"
                id="twoToleRadio"
                value="2"
                onChange={(e) => {
                  setToleNumber(2);
                  setIsTwoFace(true);
                }}
              />
              <label className="form-check-label" htmlFor="twoToleRadio">
                2 mặt tôn
              </label>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="d-flex flex-row justify-content-between">
          <div className="form-check form-switch mb-3 d-flex flex-row p-0">
            <h6 style={{ marginLeft: "12px" }}>Bảng 2 mặt: </h6>
            <input
              style={{ marginLeft: "10px" }}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="twoFaceSwitch"
              checked={isTwoFace}
              disabled={toleNumber === 2 ? true : false}
              onChange={(e) => {
                setIsTwoFace(!isTwoFace);
              }}
            />
          </div>
          <div className="form-check form-switch mb-3 d-flex flex-row p-0">
            <h6 style={{ marginLeft: "12px" }}>Bảng có chân: </h6>
            <input
              style={{ marginLeft: "10px" }}
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={(e) => {
                setHasFooter(!hasFooter);
              }}
            />
          </div>
          <div className="form-check form-switch d-flex flex-row-reverse p-0">
            <input
              style={{ marginLeft: "10px" }}
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={(e) => {
                setIsDelivery(!isDelivery);
              }}
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
              Phí phát sinh:
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
            value={costIncurred}
            onChange={(e) => setCostIncurred(e.target.valueAsNumber)}
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
