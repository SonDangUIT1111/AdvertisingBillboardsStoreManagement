import { Customer } from "../models/customer";
import "../styles/styles.css";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
type RecordProps = {
  _id: string;
  name: string;
  phoneNumber: string;
  total: number;
  payed: number;
  debt: number;
  select: (item: Customer) => void;
};
export function KhachHangRecordItemList({
  _id,
  name,
  phoneNumber,
  total,
  payed,
  debt,
  select,
}: RecordProps) {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-content-center card p-3 mb-2 scale-hover"
        onClick={() => {
          let input: Customer = {
            _id: _id,
            name: name,
            phoneNumber: phoneNumber,
            total: total,
            payed: payed,
            debt: debt,
          };
          select(input);
        }}
      >
        <span
          className="text-left mt-2"
          style={{ width: "50%", fontWeight: "500" }}
        >
          {phoneNumber}
        </span>
        <span className="text-left mt-2" style={{ width: "25%" }}>
          {name}
        </span>
        <span className="text-left mt-2" style={{ width: "25%" }}>
          {formatCurrency(debt)}
        </span>
      </div>
    </>
  );
}
