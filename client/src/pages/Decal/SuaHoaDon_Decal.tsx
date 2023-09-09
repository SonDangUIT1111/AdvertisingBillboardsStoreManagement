import { Edit_Decal_BangRon_Component } from "../../components/drag_and_drop_component/Edit_Decal_BangRon_Component";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { useEffect, useState } from "react";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import * as RevenueApi from "../../network/revenue_api";
import { DecalBillInput } from "../../network/decalBill_api";
import { ServicePrice } from "../../models/servicePrice";
import { Toast } from "bootstrap";
import "../../styles/styles.css";
import { Customer, Customer as CustomerModel } from "../../models/customer";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";
import { useParams } from "react-router-dom";
import { RevenueInput } from "../../network/revenue_api";
import { toContainElement } from "@testing-library/jest-dom/matchers";
import { PasswordInput } from "../../components/PasswordInput";

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
  let [oldTotal, setOldTotal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [state, setState] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [choseWhat, setChoseWhat] = useState("");

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
      if (typeof idBill === "undefined") idBill = "";
      await DecalBillApi.fetchDecalBill(idBill).then((data) => {
        let copyCat: DecalBillJoinCustomer[] = [];

        customers.map((customer) => {
          if (customer._id === data.idCustomer) {
            copyCat.push({
              _id: data._id,
              idCustomer: data.idCustomer,
              note: data.note,
              width: data.width,
              height: data.height,
              amount: data.amount,
              discount: data.discount,
              totalPrice: data.totalPrice,
              billPrice: data.billPrice,
              deposit: data.deposit,
              state: data.state,
              image: data.image,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              customerName: customer.name,
              phoneNumber: customer.phoneNumber,
            });
          }
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
            setOldTotal(item.totalPrice);
            setAmount(item.amount);
            setState(item.state);
            setCreatedAt(item.createdAt);
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
      await CustomerApi.updateCustomer(idCustomer, input).then((data) => {
        console.log("edit xong cusomer");
        handleRevenueAndCustomer();
      });
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

  async function updateRevenueAndCustomer(
    isUpdateCustomer: boolean,
    isUpdateRevenue: boolean,
    customerId: string,
    inputRevenue: RevenueInput,
    inputCustomer: CustomerApi.CustomerInput
  ) {
    if (isUpdateRevenue) {
      await RevenueApi.updateRevenue(
        inputRevenue.month,
        inputRevenue.year,
        inputRevenue
      );
    }
    if (isUpdateCustomer) {
      await CustomerApi.updateCustomer(customerId, inputCustomer);
    }
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

    if (nameCustomer !== name || oldTotal !== total) {
      console.log(oldTotal + " voi moi la :" + total);
      customers.map((customer) => {
        if (customer._id === idCustomer) {
          let input: CustomerApi.CustomerInput = {
            name: name,
            phoneNumber: customer.phoneNumber,
            total: customer.total + total - oldTotal,
            payed: customer.payed,
            debt: customer.debt + total - oldTotal,
          };
          onEditCustomer(input);
        }
      });
    } else {
      handleRevenueAndCustomer();
    }
  }

  const handleBill = async () => {
    editBill();
  };

  const handleRevenueAndCustomer = async () => {
    if (choseWhat === "Thanh toán") {
      let inputRevenue: RevenueInput = {
        totalIncome: 0,
        totalOutcome: 0,
        month: 0,
        year: 0,
        kindRevenue: {
          incomeDecal: 0,
          incomeBangRon: 0,
          incomeBangHieu: 0,
          incomeKhac: 0,
          decalOrder: 0,
          bangRonOrder: 0,
          bangHieuOrder: 0,
          khacOrder: 0,
        },
      };
      let inputCustomer: CustomerApi.CustomerInput = {
        name: "",
        phoneNumber: "",
        total: 0,
        payed: 0,
        debt: 0,
      };

      const customerFind = customers.filter((item) => item._id === idCustomer);
      console.log(customerFind);
      customerFind.map((item) => {
        inputCustomer = {
          name: item.name,
          phoneNumber: item.phoneNumber,
          total: item.total - oldTotal + total,
          payed: item.payed + total,
          debt: item.debt - oldTotal,
        };
      });

      await RevenueApi.fetchRevenues().then((data) => {
        let currentTime = {
          month: createdAt.split("-")[1],
          year: createdAt.split("-")[0],
        };
        const findItem = data.filter(
          (item) =>
            item.month === parseInt(currentTime.month) &&
            item.year === parseInt(currentTime.year)
        );
        if (findItem.length === 0) {
          inputRevenue = {
            totalIncome: total,
            totalOutcome: price - total,
            month: parseInt(currentTime.month),
            year: parseInt(currentTime.year),
            kindRevenue: {
              incomeDecal: total,
              incomeBangRon: 0,
              incomeBangHieu: 0,
              incomeKhac: 0,
              decalOrder: 1,
              bangRonOrder: 0,
              bangHieuOrder: 0,
              khacOrder: 0,
            },
          };
        } else {
          findItem.map((item) => {
            inputRevenue = {
              totalIncome: item.totalIncome + total,
              totalOutcome: item.totalOutcome + price - total,
              month: item.month,
              year: item.year,
              kindRevenue: {
                incomeDecal: item.kindRevenue.incomeDecal + total,
                incomeBangRon: item.kindRevenue.incomeBangRon,
                incomeBangHieu: item.kindRevenue.incomeBangHieu,
                incomeKhac: item.kindRevenue.incomeKhac,
                decalOrder: item.kindRevenue.decalOrder + 1,
                bangRonOrder: item.kindRevenue.bangRonOrder,
                bangHieuOrder: item.kindRevenue.bangHieuOrder,
                khacOrder: item.kindRevenue.khacOrder,
              },
            };
          });
        }
        updateRevenueAndCustomer(
          true,
          true,
          idCustomer,
          inputRevenue,
          inputCustomer
        );
      });
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
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
      <PasswordInput />
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
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
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
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
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
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
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
                state={state}
                setChoseWhat={setChoseWhat}
                setState={setState}
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
