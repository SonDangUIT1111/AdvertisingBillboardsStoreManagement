/* eslint-disable react/jsx-pascal-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { Information_Decal_BangRon } from "../../components/drag_and_drop_component/Information_Decal_BangRon";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import { DecalBillInput } from "../../network/decalBill_api";
import { HoaDonDecalData } from "../../data/data";
import { ServicePrice } from "../../models/servicePrice";
import { DecalBill } from "../../models/decalBill";
import { useForm } from "react-hook-form";
import { Toast } from "bootstrap";
import { Customer } from "../../models/customer";

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
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
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

  async function loadServicePrice() {
    console.log("fetch");
    try {
      const results = await ServicePriceApi.fetchServicePrices();
      setServicePrices(results);
    } catch (error) {
      console.error(error);
    }
  }
  async function loadCustomer() {
    console.log("fetch");
    try {
      const results = await CustomerApi.fetchCustomers();
      setCustomers(results);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadServicePrice();
    loadCustomer();
  }, []);

  async function onSubmit(input: DecalBillInput) {
    try {
      await DecalBillApi.createDecalBill(input);

      const toastLiveExample = document.getElementById("liveToastSuccess");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  async function createBill() {
    let input: DecalBillInput = {
      amount: amount,
      idCustomer: "12",
      note: note,
      width: width,
      height: height,
      discount: discount,
      totalPrice: total,
      billPrice: price,
      deposit: deposit,
      state: "Chưa xong",
    };
    onSubmit(input);
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    createBill();
  };
  const handleCalculate = () => {
    if (servicePrices) {
      try {
        let index = 1;
        let cost = 1;
        servicePrices.map((item) => {
          if (index === 1) {
            cost = item.price;
            index++;
          } else {
            index++;
          }
        });
        setPrice(height * width * cost * amount);
        setTotal(height * width * cost * amount - discount);
        setCopy(height * width * cost * amount);
      } catch (error) {}
    }
  };
  const handleCalculateWithDiscount = (value: number) => {
    setTotal(copy - value);
  };

  const handleChangePhone = async (value: string) => {
    let flag = false;
    customers.map((customer) => {
      if (customer.phoneNumber === value) {
        setName(customer.name);
        flag = true;
      }
    });
    if (!flag) {
      setName("");
    }
  };

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative mt-1 me-2"
      >
        <div
          className="bg-green toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastSuccess"
        >
          <div className="d-flex">
            <div className="toast-body">Thêm hóa đơn thành công.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative mt-1 me-2"
      >
        <div
          className="bg-red toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastFail"
        >
          <div className="d-flex">
            <div className="toast-body">
              Thêm hóa đơn thất bại, thông tin lỗi.
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div className="container position-relative">
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
              name={name}
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
              handleChangePhone={handleChangePhone}
            />
          </div>
        </div>
      </div>
    </>
  );
}
