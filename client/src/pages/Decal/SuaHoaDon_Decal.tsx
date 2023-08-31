import { Edit_Decal_BangRon_Component } from "../../components/drag_and_drop_component/Edit_Decal_BangRon_Component";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { useEffect, useState } from "react";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import { DecalBillInput } from "../../network/decalBill_api";
import { HoaDonDecalData } from "../../data/data";
import { ServicePrice } from "../../models/servicePrice";
import { DecalBill } from "../../models/decalBill";
import { useForm } from "react-hook-form";
import { Toast } from "bootstrap";
import "../../styles/styles.css";
import { Customer, Customer as CustomerModel } from "../../models/customer";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";
import { useParams } from "react-router-dom";

export type BillDecal_BangRonEditProps = {
  idBill: string;
  phoneNumberBill: string;
  customerNameBill: string;
  idCustomerBill: string;
  noteBill: string;
  widthBill: number;
  heightBill: number;
  amountBill: number;
  totalPriceBill: number;
  billPriceBill: number;
  discountBill: number;
  depositBill: number;
  stateBill: string;
  imageBill: string;
};

export function SuaHoaDon_Decal() {
  let { idBill } = useParams();
  let [cost, setCost] = useState(1);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
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
  const [state, setState] = useState("");

  async function loadCustomer() {
    try {
      document.getElementById("trigger")?.click();
      await CustomerApi.fetchCustomers().then((data) => {
        data.map((item) => customers.push(item));
        loadDecalBill();
      });
    } catch (error) {
      console.error(error);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadDecalBill() {
    try {
      await DecalBillApi.fetchDecalBills().then((data) => {
        let copyCat: DecalBillJoinCustomer[] = [];
        data.map((item) => {
          customers.map((customer) => {
            if (customer._id === item.idCustomer) {
              copyCat.push({
                _id: item._id,
                idCustomer: item.idCustomer,
                note: item.note,
                width: item.width,
                height: item.height,
                amount: item.amount,
                discount: item.discount,
                totalPrice: item.totalPrice,
                billPrice: item.billPrice,
                deposit: item.deposit,
                state: item.state,
                image: item.image,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                customerName: customer.name,
                phoneNumber: customer.phoneNumber,
              });
            }
          });
        });
        copyCat.map((item) => {
          if (item._id === idBill) {
            if (typeof item.customerName === "undefined")
              item.customerName = "";
            if (typeof item.phoneNumber === "undefined") item.phoneNumber = "";
            setIdCustomer(item.idCustomer);
            setNameCustomer(item.customerName);
            setImageData(item.image);
            setPhoneNumber(item.phoneNumber);
            setName(item.customerName);
            setNote(item.note);
            setHeight(item.height);
            setWidth(item.width);
            setPrice(item.billPrice);
            setDiscount(item.discount);
            setDeposit(item.deposit);
            setCopy(item.billPrice);
            setTotal(item.totalPrice);
            setAmount(item.amount);
            setState(item.state);
          }
        });
        document.getElementById("closeModal")?.click();
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  async function loadServicePrice() {
    try {
      await ServicePriceApi.fetchServicePrices().then((data) => {
        data.map((item) => {
          servicePrices.push({
            serviceName: item.serviceName,
            price: item.price,
            _id: "",
            createdAt: "",
            updatedAt: "",
          });
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  useEffect(() => {
    loadServicePrice();
    loadCustomer();
  }, []);

  async function onSubmit(input: DecalBillInput) {
    try {
      if (typeof idBill === "undefined") idBill = "";
      await DecalBillApi.updateDecalBill(idBill, input);

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

  async function onEditCustomer(input: CustomerApi.CustomerInput) {
    try {
      await CustomerApi.updateCustomer(idCustomer, input);
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  function processInfo() {
    handleCalculate();
    handleBill();
  }

  function editBill() {
    let input: DecalBillInput = {
      amount: amount,
      idCustomer: idCustomer,
      note: note,
      width: width,
      height: height,
      discount: discount,
      totalPrice: total,
      billPrice: price,
      deposit: deposit,
      state: state,
      image: imageData,
    };
    onSubmit(input);
  }

  const handleBill = () => {
    editBill();
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
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    processInfo();
  };
  const handleCalculate = () => {
    let index = 1;
    servicePrices.map((item) => {
      if (index === 1) {
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

  return (
    <>
      <button
        type="button"
        id="trigger"
        className="trigger"
        data-bs-toggle="modal"
        data-bs-target="#loadingModal"
      ></button>
      <div
        className="modal fade"
        id="loadingModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel2"
        aria-hidden="false"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-green">
            <div className="modal-body">Đang tải dữ liệu ...</div>
            <button
              type="button"
              id="closeModal"
              className="trigger"
              data-bs-dismiss="modal"
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
          className="bg-green toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastSuccess"
        >
          <div className="d-flex">
            <div className="toast-body">Chỉnh sửa hóa đơn thành công.</div>
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
              Chỉnh sửa hóa đơn thất bại, thông tin lỗi.
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
            <FileDrop setImageData={setImageData} imageData={imageData} />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <>
              <Edit_Decal_BangRon_Component
                phoneNumber={phoneNumber}
                amount={amount}
                price={price}
                total={total}
                name={name}
                note={note}
                width={width}
                height={height}
                deposit={deposit}
                discount={discount}
                setAmount={setAmount}
                setPhoneNumber={setPhoneNumber}
                setName={setName}
                setNote={setNote}
                setHeight={setHeight}
                setWidth={setWidth}
                setPrice={setPrice}
                setDiscount={setDiscount}
                setDeposit={setDeposit}
                handleEdit={handleEdit}
                handleCalculate={handleCalculate}
                handleCalculateWithDiscount={handleCalculateWithDiscount}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
