import { EditBangHieu_Component } from "../../components/drag_and_drop_component/Edit_BangHieu_Component";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { SetStateAction, useEffect, useState } from "react";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as BangHieuBillApi from "../../network/bangHieuBill_api";
import * as CustomerApi from "../../network/customer_api";
import * as RevenueApi from "../../network/revenue_api";
import { BangHieuBillInput } from "../../network/bangHieuBill_api";
import { ServicePrice } from "../../models/servicePrice";
import { Toast } from "bootstrap";
import "../../styles/styles.css";
import { Customer as CustomerModel } from "../../models/customer";
import { BangHieuBillJoinCustomer } from "../../models/bangHieuBillJoinCustomer";
import { useParams } from "react-router-dom";
import { RevenueInput } from "../../network/revenue_api";

export function SuaHoaDon_BangHieu() {
  let { idBill } = useParams();
  let [cost, setCost] = useState(1);
  let [costFooter, setCostFooter] = useState(1);
  let [costDelivery, setCostDelivery] = useState(1);
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
  const [materialType, setMaterialType] = useState("");
  const [isTwoFace, setIsTwoFace] = useState(false);
  const [toleNumber, setToleNumber] = useState(0);
  const [hasFooter, setHasFooter] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [costIncurred, setCostIncurred] = useState(0);
  const [choseWhat, setChoseWhat] = useState("");

  async function loadCustomer() {
    try {
      document.getElementById("trigger")?.click();
      await CustomerApi.fetchCustomers().then((data) => {
        data.map((item) => customers.push(item));
        loadBangHieuBill();
      });
    } catch (error) {
      console.error(error);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadBangHieuBill() {
    try {
      if (typeof idBill === "undefined") idBill = "";
      await BangHieuBillApi.fetchBangHieuBill(idBill).then((data) => {
        let copyCat: BangHieuBillJoinCustomer[] = [];

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
              materialType: data.materialType,
              isTwoFace: data.isTwoFace,
              toleNumber: data.toleNumber,
              hasFooter: data.hasFooter,
              isDelivery: data.isDelivery,
              costIncurred: data.costIncurred,
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
            setMaterialType(item.materialType);
            setIsTwoFace(item.isTwoFace);
            setToleNumber(item.toleNumber);
            setHasFooter(item.hasFooter);
            setIsDelivery(item.isDelivery);
            setCostIncurred(item.costIncurred);
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

  async function onSubmit(input: BangHieuBillInput) {
    try {
      if (typeof idBill === "undefined") idBill = "";
      await BangHieuBillApi.updateBangHieuBill(idBill, input);

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
    const currentTime = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    if (isUpdateRevenue) {
      await RevenueApi.updateRevenue(
        currentTime.month,
        currentTime.year,
        inputRevenue
      );
    }
    if (isUpdateCustomer) {
      await CustomerApi.updateCustomer(customerId, inputCustomer);
    }
  }

  function editBill() {
    let input: BangHieuBillInput = {
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
      materialType: materialType,
      isTwoFace: isTwoFace,
      toleNumber: toleNumber,
      hasFooter: hasFooter,
      isDelivery: isDelivery,
      costIncurred: costIncurred,
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
          incomeHopDen: 0,
          incomeTanHon: 0,
          incomeKhac: 0,
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
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        };
        const findItem = data.filter(
          (item) =>
            item.month === currentTime.month && item.year === currentTime.year
        );
        if (findItem.length === 0) {
          inputRevenue = {
            totalIncome: total,
            totalOutcome: price - total,
            month: currentTime.month,
            year: currentTime.year,
            kindRevenue: {
              incomeDecal: 0,
              incomeBangRon: 0,
              incomeBangHieu: total,
              incomeHopDen: 0,
              incomeTanHon: 0,
              incomeKhac: 0,
            },
          };
        } else {
          findItem.map((item) => {
            inputRevenue = {
              totalIncome: item.totalIncome + total,
              totalOutcome: item.totalOutcome + price - total,
              month: currentTime.month,
              year: currentTime.year,
              kindRevenue: {
                incomeDecal: item.kindRevenue.incomeDecal,
                incomeBangRon: item.kindRevenue.incomeBangRon,
                incomeBangHieu: item.kindRevenue.incomeBangHieu + total,
                incomeHopDen: item.kindRevenue.incomeHopDen,
                incomeTanHon: item.kindRevenue.incomeTanHon,
                incomeKhac: item.kindRevenue.incomeKhac,
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
    let index = 1,
      location = 0;
    if (materialType === "Bạt") {
      if (!isTwoFace) location = 3;
      else location = 4;
    } else {
      if (!isTwoFace && toleNumber === 1) {
        location = 5;
      } else if (isTwoFace && toleNumber === 1) {
        location = 6;
      } else if (isTwoFace && toleNumber === 2) {
        location = 7;
      }
    }
    servicePrices.map((item) => {
      if (index === location) {
        cost = item.price;
        index++;
      } else if (index === 8) {
        setCostFooter(item.price);
        index++;
      } else if (index === 9) {
        setCostDelivery(item.price);
        index++;
      } else {
        index++;
      }
    });

    try {
      let addition = 0;
      if (hasFooter) addition += costFooter;
      if (isDelivery) addition += costDelivery;
      price = height * width * cost * amount + addition + costIncurred;
      total =
        height * width * cost * amount + addition + costIncurred - discount;
      copy = height * width * cost * amount + addition + costIncurred;
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
              <EditBangHieu_Component
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
                materialType={materialType}
                isTwoFace={isTwoFace}
                hasFooter={hasFooter}
                isDelivery={isDelivery}
                costIncurred={costIncurred}
                toleNumber={toleNumber}
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
                setMaterialType={setMaterialType}
                setIsTwoFace={setIsTwoFace}
                setToleNumber={setToleNumber}
                setHasFooter={setHasFooter}
                setIsDelivery={setIsDelivery}
                setCostIncurred={setCostIncurred}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
