/* eslint-disable react/jsx-pascal-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { Information_Decal_BangRon } from "../../components/drag_and_drop_component/Information_Decal_BangRon";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as BangRonBillApi from "../../network/bangRonBill_api";
import * as CustomerApi from "../../network/customer_api";
import { DecalBillInput } from "../../network/decalBill_api";
import { ServicePrice } from "../../models/servicePrice";
import { DecalBill } from "../../models/decalBill";
import { useForm } from "react-hook-form";
import { Toast } from "bootstrap";
import { Customer as CustomerModel } from "../../models/customer";

export function ThemHoaDonMoi_BangRon() {
  let [cost, setCost] = useState(1);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [customer, setCustomer] = useState<CustomerModel>();
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [isExistCustomer, setIsExistCustomer] = useState(false);
  let [idCustomer, setIdCustomer] = useState("");
  let [nameCustomer, setNameCustomer] = useState("");
  const [imageData, setImageData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  let [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  let [copy, setCopy] = useState(0);
  let [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(1);

  async function loadServicePrice() {
    try {
      const results = await ServicePriceApi.fetchServicePrices().then(
        (data) => {
          data.map((item) => {
            servicePrices.push({
              serviceName: item.serviceName,
              price: item.price,
              _id: "",
              createdAt: "",
              updatedAt: "",
            });
          });
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  async function loadCustomer() {
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

  async function onSubmit(input: BangRonBillApi.BangRonBillInput) {
    try {
      await BangRonBillApi.createBangRonBill(input);

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

  async function onSubmitCustomer(input: CustomerApi.CustomerInput) {
    try {
      const result = await CustomerApi.createCustomer(input).then((data) => {
        customers.push({
          name: data.name,
          phoneNumber: data.phoneNumber,
          _id: data._id,
          total: data.total,
          payed: data.payed,
          debt: data.debt,
        });
      });
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  async function onEditCustomer(input: CustomerApi.CustomerInput) {
    try {
      const result = await CustomerApi.updateCustomer(idCustomer, input);
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  function processInfoCustomer() {
    handleCalculate();
    handleCustomer();
  }

  function createBill() {
    let input: BangRonBillApi.BangRonBillInput = {
      amount: amount,
      idCustomer: idCustomer,
      note: note,
      width: width,
      height: height,
      discount: discount,
      totalPrice: total,
      billPrice: price,
      deposit: deposit,
      state: "Chưa xong",
      image: imageData,
    };
    onSubmit(input);
  }

  const handleCustomer = () => {
    if (!isExistCustomer) {
      let input: CustomerApi.CustomerInput = {
        name: name,
        phoneNumber: phoneNumber,
        total: total,
        payed: 0,
        debt: total,
      };
      onSubmitCustomer(input).then(() => {
        let index = 0;
        customers.map((item) => {
          if (index === customers.length - 1) {
            idCustomer = item._id;
            index++;
          } else {
            index++;
          }
        });
        createBill();
      });
      setIsExistCustomer(true);
    } else {
      createBill();
      if (nameCustomer !== name) {
        customers.map((customer) => {
          if (customer._id === idCustomer) {
            let input: CustomerApi.CustomerInput = {
              name: name,
              phoneNumber: customer.phoneNumber,
              total: customer.total + total,
              payed: customer.payed,
              debt: customer.debt + total,
            };
            onEditCustomer(input);
          }
        });
      } else {
        customers.map((customer) => {
          if (customer._id === idCustomer) {
            let input: CustomerApi.CustomerInput = {
              name: nameCustomer,
              phoneNumber: customer.phoneNumber,
              total: customer.total + total,
              payed: customer.payed,
              debt: customer.debt + total,
            };
            onEditCustomer(input);
          }
        });
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (width === 0 || height === 0) {
      const toastLiveExample = document.getElementById(
        "liveToastFailDimension"
      );
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      return;
    }
    processInfoCustomer();
  };
  const handleCalculate = () => {
    let index = 1;
    servicePrices.map((item) => {
      if (index === 2) {
        cost = item.price;
        index++;
      } else {
        index++;
      }
    });

    try {
      price = height * width * cost * amount;
      total = height * width * cost * amount - discount;
      copy = height * width * cost * amount;
      setPrice(price);
      setTotal(total);
      setCopy(copy);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCalculateWithDiscount = (value: number) => {
    handleCalculate();
    setTotal(copy - value);
  };

  const handleChangePhone = async (value: string) => {
    let flag = false;
    customers.map((customer) => {
      if (customer.phoneNumber === value) {
        setName(customer.name);
        setNameCustomer(customer.name);
        setIdCustomer(customer._id);
        setIsExistCustomer(true);
        flag = true;
      }
    });
    if (!flag) {
      setName("");
      setNameCustomer("");
      setIdCustomer("");
      setIsExistCustomer(false);
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
          id="liveToastFailDimension"
        >
          <div className="d-flex">
            <div className="toast-body">Giá trị kích thước không hợp lệ.</div>
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
            <FileDrop setImageData={setImageData} imageData={""} />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <>
              <Information_Decal_BangRon
                amount={amount}
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
            </>
          </div>
        </div>
      </div>
    </>
  );
}
