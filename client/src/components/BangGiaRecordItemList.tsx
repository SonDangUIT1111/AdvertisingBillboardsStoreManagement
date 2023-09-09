import { ServicePrice } from "../models/servicePrice";
import "../styles/styles.css";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
type RecordProps = {
  _id: string;
  stt: number;
  serviceName: string;
  price: number;
  select: (item: ServicePrice) => void;
};
export function BangGiaRecordItemList({
  _id,
  stt,
  serviceName,
  price,
  select,
}: RecordProps) {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-content-center card p-3 mb-2 scale-hover"
        onClick={() => {
          let input: ServicePrice = {
            _id: _id,
            serviceName: serviceName,
            price: price,
            createdAt: "",
            updatedAt: "",
          };
          select(input);
        }}
      >
        <span
          className="text-left mt-2"
          style={{ width: "5%", fontWeight: "500" }}
        >
          {stt}
        </span>
        <span className="text-left mt-2" style={{ width: "65%" }}>
          {serviceName}
        </span>
        <span className="text-left mt-2" style={{ width: "25%" }}>
          {formatCurrency(price)}
        </span>
      </div>
    </>
  );
}
