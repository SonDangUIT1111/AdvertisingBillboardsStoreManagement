import { useState } from "react";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import {
  BillDecal_BangRonInfoProps,
  Information_Decal_BangRon,
} from "../../components/drag_and_drop_component/Information_Decal_BangRon";

import { HoaDonDecalData } from "../../data/data";

export type HoaDonDecal_BangRonProps = {
  id: number;
  phoneNumber: string;
  name: string;
  note: string;
  height: number;
  width: number;
  price: number;
  discount: number;
  deposit: number;
  state: string;
  dateOrder: string;
  total: number;
  setState: (index: number, state: string) => void;
};

export function ThemHoaDonMoi_Decal() {
  const servicePrice = 0;
  const [imageData, setImageData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [copy, setCopy] = useState(0);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(1);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    HoaDonDecalData.push({
      id: 123,
      phoneNumber,
      name,
      note,
      height,
      width,
      price,
      discount,
      deposit,
      state: "Chưa hoàn thành",
      dateOrder: "1/1/2023",
      total: 0,
    });
    console.log(imageData);
  };
  const handleCalculate = () => {
    setPrice(height * width * servicePrice * amount);
    setTotal(height * width * servicePrice * amount - discount);
    setCopy(height * width * servicePrice * amount);
  };
  const handleCalculateWithDiscount = (value: number) => {
    setTotal(copy - value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <FileDrop setImageData={setImageData} />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <Information_Decal_BangRon
              amount={amount}
              imageData={imageData}
              price={price}
              total={total}
              setAmount={setAmount}
              setPhoneNumber={setPhoneNumber}
              setName={setName}
              setNote={setNote}
              setHeight={setHeight}
              setWidth={setWidth}
              setPrice={setPrice}
              setDiscount={setDiscount}
              setDeposit={setDeposit}
              handleAdd={handleAdd}
              handleCalculate={handleCalculate}
              handleCalculateWithDiscount={handleCalculateWithDiscount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
