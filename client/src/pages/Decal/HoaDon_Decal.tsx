import { MouseEventHandler, useEffect, useState } from "react";
import { HoaDonItemList } from "../../components/HoaDonItemList";
import { HoaDonTitle } from "../../components/HoaDonTitle";
import { SearchBar } from "../../components/SearchBar";
import { DecalBill } from "../../models/decalBill";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import * as RevenueApi from "../../network/revenue_api";
import "../../styles/styles.css";
import { Customer } from "../../models/customer";
import { RevenueInput } from "../../network/revenue_api";

type PhoneNumberType = {
  id?: string;
  nameInfo?: string;
  phoneInfo?: string;
};

export function HoaDon_Decal() {
  let [idDeleting, setIdDeleting] = useState("");
  let [isEmptyList, setIsEmptyList] = useState(true);
  let [isDefault, setIsDefault] = useState(true);
  let [list, setList] = useState<DecalBillJoinCustomer[]>([]);
  let [copyList, setCopyList] = useState<DecalBillJoinCustomer[]>([]);
  let [customerList, setCustomerList] = useState<Customer[]>([]);

  async function loadCustomer() {
    try {
      document.getElementById("trigger")?.click();
      await CustomerApi.fetchCustomers().then((data) => {
        data.map((item) => customerList.push(item));
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
        if (data.length > 0) setIsEmptyList(false);
        let copyCat: DecalBillJoinCustomer[] = [];
        data.map((item) => {
          const findItem = customerList.find(
            (customer) => customer._id === item.idCustomer
          );
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
            customerName: findItem?.name,
            phoneNumber: findItem?.phoneNumber,
          });
        });
        setList(copyCat);
        setCopyList(copyCat);
        document.getElementById("closeModal")?.click();
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  async function updateRevenueAndCustomer(
    customerId: string,
    inputRevenue: RevenueInput,
    inputCustomer: CustomerApi.CustomerInput
  ) {
    const currentTime = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    await RevenueApi.updateRevenue(
      currentTime.month,
      currentTime.year,
      inputRevenue
    );
    await CustomerApi.updateCustomer(customerId, inputCustomer);
  }

  async function updateState(id: string, input: DecalBillApi.DecalBillInput) {
    await DecalBillApi.updateDecalBill(id, input);
  }

  useEffect(() => {
    loadCustomer();
  }, []);

  const handleSort = () => {
    const copyCat = list;
    if (isDefault) {
      copyCat.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } else
      copyCat.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    setList(copyCat.filter((item) => item));
    setCopyList(copyCat.filter((item) => item));
    setIsDefault((prev) => !prev);
  };

  const setState = async (
    obj: DecalBillApi.DecalBillInput,
    index: string,
    stateString: string
  ) => {
    console.log(list);
    setList(
      list.map((item) =>
        item._id === index ? { ...item, state: stateString } : item
      )
    );
    setCopyList(
      copyList.map((item) =>
        item._id === index ? { ...item, state: stateString } : item
      )
    );
    let input: DecalBillApi.DecalBillInput = {
      idCustomer: obj.idCustomer,
      note: obj.note,
      width: obj.width,
      height: obj.height,
      amount: obj.amount,
      discount: obj.discount,
      totalPrice: obj.totalPrice,
      billPrice: obj.billPrice,
      deposit: obj.deposit,
      state: stateString,
      image: obj.image,
    };
    updateState(index, input);

    // update revenue and customer

    if (stateString === "Thanh toán") {
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

      const customerFind = customerList.filter(
        (item) => item._id === obj.idCustomer
      );
      customerFind.map((item) => {
        inputCustomer = {
          name: item.name,
          phoneNumber: item.phoneNumber,
          total: item.total,
          payed: item.payed + obj.totalPrice,
          debt: item.debt - obj.totalPrice,
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
            totalIncome: obj.totalPrice,
            totalOutcome: obj.billPrice - obj.totalPrice,
            month: currentTime.month,
            year: currentTime.year,
            kindRevenue: {
              incomeDecal: obj.totalPrice,
              incomeBangRon: 0,
              incomeBangHieu: 0,
              incomeHopDen: 0,
              incomeTanHon: 0,
              incomeKhac: 0,
            },
          };
        } else {
          findItem.map((item) => {
            inputRevenue = {
              totalIncome: item.totalIncome + obj.totalPrice,
              totalOutcome: item.totalOutcome + obj.billPrice - obj.totalPrice,
              month: currentTime.month,
              year: currentTime.year,
              kindRevenue: {
                incomeDecal: item.kindRevenue.incomeDecal + obj.totalPrice,
                incomeBangRon: item.kindRevenue.incomeBangRon,
                incomeBangHieu: item.kindRevenue.incomeBangHieu,
                incomeHopDen: item.kindRevenue.incomeHopDen,
                incomeTanHon: item.kindRevenue.incomeTanHon,
                incomeKhac: item.kindRevenue.incomeKhac,
              },
            };
          });
        }
        updateRevenueAndCustomer(obj.idCustomer, inputRevenue, inputCustomer);
      });
    }
  };

  const deleteBillAlert = async (id: string) => {
    setIdDeleting(id);
    document.getElementById("triggerAlert")?.click();
  };
  const deleteBill = async () => {
    await DecalBillApi.deleteDecalBill(idDeleting);
    setList(list.filter((item) => item._id !== idDeleting));
    setCopyList(copyList.filter((item) => item._id !== idDeleting));

    // bo sung update revenue
    let total: number,
      price: number = 0;
    let idCus = "";
    list.map((item) => {
      if (item._id === idDeleting) {
        total = item.totalPrice;
        price = item.billPrice;
        idCus = item.idCustomer;
      }
    });
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

    const customerFind = customerList.filter((item) => item._id === idCus);
    customerFind.map((item) => {
      inputCustomer = {
        name: item.name,
        phoneNumber: item.phoneNumber,
        total: item.total,
        payed: item.payed + total,
        debt: item.debt - total,
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
            incomeDecal: total,
            incomeBangRon: 0,
            incomeBangHieu: 0,
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
              incomeDecal: item.kindRevenue.incomeDecal + total,
              incomeBangRon: item.kindRevenue.incomeBangRon,
              incomeBangHieu: item.kindRevenue.incomeBangHieu,
              incomeHopDen: item.kindRevenue.incomeHopDen,
              incomeTanHon: item.kindRevenue.incomeTanHon,
              incomeKhac: item.kindRevenue.incomeKhac,
            },
          };
        });
      }
      updateRevenueAndCustomer(idCus, inputRevenue, inputCustomer);
    });
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
      <button
        type="button"
        id="triggerAlert"
        className="trigger"
        data-bs-toggle="modal"
        data-bs-target="#alertModal"
      ></button>
      <div
        className="modal fade"
        id="alertModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Xác nhận
              </h5>
            </div>
            <div className="modal-body">Bạn có chắc chắn xóa hóa đơn này ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => deleteBill()}
                data-bs-dismiss="modal"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <SearchBar
        areaIndex={"1"}
        listInfo={list}
        setList={setList}
        copyList={copyList}
      />
      <HoaDonTitle handleSort={handleSort} />
      {isEmptyList === true ? (
        <h5 style={{ color: "#2FB872" }} className="ms-3">
          Danh sách hiện chưa có hóa đơn nào ~
        </h5>
      ) : (
        {}
      )}
      {list.map((data) => (
        <HoaDonItemList
          key={data._id}
          phoneNumber={data.phoneNumber}
          name={data.customerName}
          note={data.note}
          height={data.height}
          width={data.width}
          price={data.billPrice}
          discount={data.discount}
          deposit={data.deposit}
          state={data.state}
          dateOrder={data.createdAt}
          id={data._id}
          total={data.totalPrice}
          idCustomer={data.idCustomer}
          amount={data.amount}
          image={data.image}
          setState={setState}
          deleteBill={deleteBillAlert}
        />
      ))}
    </>
  );
}
