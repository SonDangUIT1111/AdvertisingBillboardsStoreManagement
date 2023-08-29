import { MouseEventHandler, useEffect, useState } from "react";
import { HoaDonItemList } from "../../components/HoaDonItemList";
import { HoaDonTitle } from "../../components/HoaDonTitle";
import { SearchBar } from "../../components/SearchBar";
import { DecalBill } from "../../models/decalBill";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";
import * as DecalBillApi from "../../network/decalBill_api";
import * as CustomerApi from "../../network/customer_api";
import "../../styles/styles.css";
import { Customer } from "../../models/customer";

type PhoneNumberType = {
  id?: string;
  nameInfo?: string;
  phoneInfo?: string;
};

export function HoaDon_Decal() {
  let [idDeleting, setIdDeleting] = useState("");
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
  const setState = (
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
    // let input: DecalBillApi.DecalBillInput = {
    //   idCustomer: obj.idCustomer,
    //   note: obj.note,
    //   width: obj.width,
    //   height: obj.height,
    //   amount: obj.amount,
    //   discount: obj.discount,
    //   totalPrice: obj.totalPrice,
    //   billPrice: obj.billPrice,
    //   deposit: obj.deposit,
    //   state: stateString,
    //   image: obj.image,
    // };
    // updateState(index, input);

    // bo sung update Revenue
  };

  const deleteBillAlert = async (id: string) => {
    setIdDeleting(id);
    document.getElementById("triggerAlert")?.click();
  };
  const deleteBill = async () => {
    // await DecalBillApi.deleteDecalBill(id);
    setList(list.filter((item) => item._id !== idDeleting));
    setCopyList(copyList.filter((item) => item._id !== idDeleting));
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
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => deleteBill()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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
        setList={setList}
        copyList={copyList}
      />
      <HoaDonTitle handleSort={handleSort} />
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
