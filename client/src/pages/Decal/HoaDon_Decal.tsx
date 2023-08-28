import { useEffect, useState } from "react";
import { HoaDonItemList } from "../../components/HoaDonItemList";
import { HoaDonTitle } from "../../components/HoaDonTitle";
import { SearchBar } from "../../components/SearchBar";
import { DecalBill } from "../../models/decalBill";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import "../../styles/styles.css";

export function HoaDon_Decal() {
  let isDefault = true;
  let [list, setList] = useState<DecalBillJoinCustomer[]>([]);
  let [copyList, setCopyList] = useState<DecalBillJoinCustomer[]>([]);

  async function loadCustomer() {
    try {
      await CustomerApi.fetchCustomers().then((data) => {
        list.map((listItem) => {
          const findItem = data.find(
            (itemFind) => itemFind._id === listItem.idCustomer
          );
          listItem.customerName = findItem?.name;
          listItem.phoneNumber = findItem?.phoneNumber;
        });
        setCopyList(list);
        document.getElementById("closeModal")?.click();
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function loadDecalBill() {
    try {
      document.getElementById("trigger")?.click();
      await DecalBillApi.fetchDecalBills().then((data) => {
        data.map((item) => {
          list.push({
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
            customerName: "",
            phoneNumber: "",
          });
        });
        loadCustomer();
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  useEffect(() => {
    loadDecalBill();
  }, []);

  const handleSort = () => {
    isDefault = !isDefault;
    const copyCat = list;
    if (isDefault) {
      copyCat.sort((a, b) => {
        return b.totalPrice - a.totalPrice;
      });
    } else
      return copyCat.sort((a, b) => {
        return a.totalPrice - b.totalPrice;
      });
  };
  const setState = (index: string, state: string) => {
    // list.map((item) => (item._id === index ? (item.state = state) : {}));
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
        aria-labelledby="exampleModalLabel"
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
        setCopyList={setCopyList}
        copyList={copyList}
      />
      <HoaDonTitle handleSort={handleSort} />
      {copyList.map((data) => (
        <HoaDonItemList
          key={data.createdAt}
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
          setState={setState}
        />
      ))}
    </>
  );
}
