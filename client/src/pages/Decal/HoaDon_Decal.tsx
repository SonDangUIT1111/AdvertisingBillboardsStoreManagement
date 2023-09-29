import { SetStateAction, useEffect, useState } from "react";
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
import { OtherBillJoinCustomer } from "../../models/otherBillJoinCustomer";
import { OtherBillInput } from "../../network/otherBill_api";
import { PasswordInput } from "../../components/PasswordInput";

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
    stateString: string,
    toPhone: string
  ) => {
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

      setCustomerList(
        customerList.map((customer) =>
          customer._id === obj.idCustomer
            ? {
                ...customer,
                payed: customer.payed + obj.totalPrice,
                debt: customer.debt - obj.totalPrice,
              }
            : customer
        )
      );

      await RevenueApi.fetchRevenues().then((data) => {
        let currentTime = {
          month: "",
          year: "",
        };
        list.map((listItem) => {
          if (listItem._id === index) {
            currentTime.month = listItem.createdAt.split("-")[1];
            currentTime.year = listItem.createdAt.split("-")[0];
          }
        });
        const findItem = data.filter(
          (item) =>
            item.month === parseInt(currentTime.month) &&
            item.year === parseInt(currentTime.year)
        );
        if (findItem.length === 0) {
          inputRevenue = {
            totalIncome: obj.totalPrice,
            totalOutcome: obj.billPrice - obj.totalPrice,
            month: parseInt(currentTime.month),
            year: parseInt(currentTime.year),
            kindRevenue: {
              incomeDecal: obj.totalPrice,
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
              totalIncome: item.totalIncome + obj.totalPrice,
              totalOutcome: item.totalOutcome + obj.billPrice - obj.totalPrice,
              month: item.month,
              year: item.year,
              kindRevenue: {
                incomeDecal: item.kindRevenue.incomeDecal + obj.totalPrice,
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
          obj.idCustomer,
          inputRevenue,
          inputCustomer
        );
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
    let status = "";
    let monthDel = "";
    let yearDel = "";
    list.map((item) => {
      if (item._id === idDeleting) {
        total = item.totalPrice;
        price = item.billPrice;
        idCus = item.idCustomer;
        status = item.state;
        monthDel = item.createdAt.split("-")[1];
        yearDel = item.createdAt.split("-")[0];
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

    const customerFind = customerList.filter((item) => item._id === idCus);
    customerFind.map((item) => {
      if (status === "Thanh toán") {
        inputCustomer = {
          name: item.name,
          phoneNumber: item.phoneNumber,
          total: item.total - total,
          payed: item.payed - total,
          debt: item.debt,
        };
      } else {
        inputCustomer = {
          name: item.name,
          phoneNumber: item.phoneNumber,
          total: item.total - total,
          payed: item.payed,
          debt: item.debt - total,
        };
      }
    });

    if (status === "Thanh toán") {
      await RevenueApi.fetchRevenues().then((data) => {
        const findItem = data.filter(
          (item) =>
            item.month === parseInt(monthDel) && item.year === parseInt(yearDel)
        );
        if (findItem.length > 0) {
          // eslint-disable-next-line array-callback-return
          findItem.map((item) => {
            inputRevenue = {
              totalIncome: item.totalIncome - total,
              totalOutcome: item.totalOutcome - price + total,
              month: item.month,
              year: item.year,
              kindRevenue: {
                incomeDecal: item.kindRevenue.incomeDecal - total,
                incomeBangRon: item.kindRevenue.incomeBangRon,
                incomeBangHieu: item.kindRevenue.incomeBangHieu,
                incomeKhac: item.kindRevenue.incomeKhac,
                decalOrder: item.kindRevenue.decalOrder - 1,
                bangRonOrder: item.kindRevenue.bangRonOrder,
                bangHieuOrder: item.kindRevenue.bangHieuOrder,
                khacOrder: item.kindRevenue.khacOrder,
              },
            };
          });
          updateRevenueAndCustomer(
            true,
            true,
            idCus,
            inputRevenue,
            inputCustomer
          );
        } else
          updateRevenueAndCustomer(
            true,
            false,
            idCus,
            inputRevenue,
            inputCustomer
          );
      });
    } else {
      updateRevenueAndCustomer(true, false, idCus, inputRevenue, inputCustomer);
    }
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
        aria-labelledby="exampleModalLabel2"
        aria-hidden="false"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-green">
            <div className="modal-body">
              <div
                className="spinner-border"
                role="status"
                style={{ height: "20px", width: "20px", marginRight: "10px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Đang tải dữ liệu ...
            </div>
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
        setListBangHieu={() => {}}
        copyList={copyList}
        listInfoBangHieu={[]}
        copyListBangHieu={[]}
        listInfoOther={[]}
        copyListOther={[]}
        setListOther={() => {}}
      />
      <HoaDonTitle handleSort={handleSort} />
      {isEmptyList === true ? (
        <h5 style={{ color: "#2FB872" }} className="ms-3">
          Danh sách hiện chưa có hóa đơn nào ~
        </h5>
      ) : (
        <></>
      )}
      {list.map((data) => (
        <HoaDonItemList
          typeBill={1}
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
          setStateBangHieu={() => {}}
          deleteBill={deleteBillAlert}
          materialType={""}
          isTwoFace={false}
          toleNumber={0}
          hasFooter={false}
          isDelivery={false}
          costIncurred={0}
          setStateOther={() => {}}
        />
      ))}
    </>
  );
}
