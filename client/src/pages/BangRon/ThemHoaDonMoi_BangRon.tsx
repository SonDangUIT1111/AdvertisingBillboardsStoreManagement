import { useState } from "react";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { Information_Decal_BangRon } from "../../components/drag_and_drop_component/Information_Decal_BangRon";
import { HoaDonBangRonData, HoaDonDecalData } from "../../data/data";

export function ThemHoaDonMoi_BangRon() {
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
    HoaDonBangRonData.push({
      id: 123,
      phoneNumber,
      name,
      note,
      height,
      width,
      price,
      discount,
      deposit,
      state: "Not completed",
      dateOrder: "1/1/2023",
      total: 0,
    });
    console.log(imageData);
  };
  const handleCalculate = () => {
    setPrice(height * width * 50000 * amount);
    setTotal(height * width * 50000 * amount - discount);
    setCopy(height * width * amount);
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
            {/* <Information_Decal_BangRon
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
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
