import "../styles/styles.css";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
type RecordProps = {
  note: string;
  price: number;
  date: string;
};
export function RecordItemList({ note, price, date }: RecordProps) {
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-content-center card p-3 mb-2 scale-hover">
        <span className="text-left mt-2" style={{ width: "33%" }}>
          {note}
        </span>
        <span className="text-left mt-2" style={{ width: "33%" }}>
          {formatCurrency(price)}
        </span>
        <span className="text-left mt-2" style={{ width: "33%" }}>
          {formatDate(date)}
        </span>
      </div>
    </>
  );
}
