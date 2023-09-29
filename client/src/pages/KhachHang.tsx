import { SetStateAction, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { KhachHangRecordItemList } from "../components/KhachHangRecordItemList";
import { Customer } from "../models/customer";
import { formatDate } from "../utils/formatDate";
import * as CustomerApi from "../network/customer_api";
import { Toast } from "bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { PasswordInput } from "../components/PasswordInput";

// this page function is not separate into many file
export function KhachHang() {
  const [isEditting, setIsEditing] = useState(false);
  const [listRecord, setListRecord] = useState<Customer[]>([]);
  let [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [payed, setPayed] = useState(0);
  const [debt, setDebt] = useState(0);
  let [oldPhone, setOldPhone] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const loadRecord = async () => {
    try {
      document.getElementById("trigger")?.click();
      await CustomerApi.fetchCustomers().then((data) => {
        let copyCat: Customer[] = [];
        data.map((item) =>
          copyCat.push({
            _id: item._id,
            name: item.name,
            phoneNumber: item.phoneNumber,
            total: item.total,
            payed: item.payed,
            debt: item.debt,
          })
        );
        setListRecord(copyCat);
        document.getElementById("closeModal")?.click();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRecord();
  }, []);

  const saveRecord = async (input: CustomerApi.CustomerInput) => {
    try {
      if (!isEditting) {
        if (!checkInfoValidationAdd()) {
          document.getElementById("triggerAlert")?.click();
          return;
        }
        await CustomerApi.createCustomer(input).then((data) => {
          setListRecord([
            ...listRecord,
            {
              _id: data._id,
              name: data.name,
              phoneNumber: data.phoneNumber,
              total: data.total,
              payed: data.payed,
              debt: data.debt,
            },
          ]);
        });
        unSelect();
      } else {
        if (!checkInfoValidationEdit()) {
          document.getElementById("triggerAlert")?.click();
          return;
        }
        await CustomerApi.updateCustomer(selectedId, input);
        setListRecord(
          listRecord.map((item) =>
            item._id === selectedId
              ? { ...item, phoneNumber: phoneNumber, name: name }
              : item
          )
        );
        unSelect();
      }

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
  };

  const checkInfoValidationAdd = () => {
    let result = true;
    listRecord.map((item) => {
      if (item.phoneNumber === phoneNumber) result = false;
    });
    return result;
  };

  const checkInfoValidationEdit = () => {
    let result = true;
    listRecord.map((item) => {
      if (item.phoneNumber !== oldPhone) {
        if (item.phoneNumber === phoneNumber) result = false;
      }
    });
    return result;
  };

  const submitInfo = (event: React.FormEvent) => {
    event.preventDefault();
    let input: CustomerApi.CustomerInput = {
      name: name,
      phoneNumber: phoneNumber,
      total: total,
      payed: payed,
      debt: debt,
    };
    saveRecord(input);
  };

  const select = (item: Customer) => {
    setIsEditing(true);
    setName(item.name);
    setPhoneNumber(item.phoneNumber);
    setOldPhone(item.name);
    setTotal(item.total);
    setPayed(item.payed);
    setDebt(item.debt);
    setSelectedId(item._id);
  };

  const unSelect = () => {
    setIsEditing(false);
    setName("");
    setPhoneNumber("");
    setTotal(0);
    setPayed(0);
    setDebt(0);
    setSelectedId("");
  };

  return (
    <>
      <PasswordInput />
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
                Thông báo
              </h5>
            </div>
            <div className="modal-body">
              Số điện thoại đã trùng hoặc không hợp lệ !
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
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
            <div className="toast-body">Thực hiện thao tác thành công.</div>
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
            <div className="toast-body">Thao tác thất bại, thông tin lỗi.</div>
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
            <form
              onSubmit={(e) => {
                submitInfo(e);
              }}
            >
              <div
                style={{
                  width: "80%",
                  fontWeight: "500",
                  fontSize: "24px",
                  textAlign: "center",
                  paddingBottom: "24px",
                }}
              >
                Thông tin khách hàng
              </div>
              <div
                className="input-group mb-3 bolder-border"
                style={{ width: "80%" }}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text span-of-input-group"
                    id="basic-addon1"
                  >
                    Điện thoại:
                  </span>
                </div>
                <input
                  type="number"
                  required
                  id="phone-txt"
                  value={phoneNumber}
                  className="form-control"
                  aria-label="With textarea"
                  onChange={(e) => {
                    phoneNumber = e.target.value;
                    setPhoneNumber(e.target.value);
                  }}
                ></input>
              </div>
              <div
                className="input-group mb-3 bolder-border"
                style={{ width: "80%" }}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text span-of-input-group"
                    id="basic-addon1"
                  >
                    Họ tên:
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  value={name}
                  required
                  id="name-txt"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div
                className="input-group mb-3 bolder-border"
                style={{ width: "80%" }}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text span-of-input-group"
                    id="basic-addon1"
                  >
                    Tổng cộng:
                  </span>
                </div>
                <span
                  className="form-control bg-light"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                >
                  {isEditting ? formatCurrency(total) : ""}
                </span>
              </div>
              <div
                className="input-group mb-3 bolder-border"
                style={{ width: "80%" }}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text span-of-input-group"
                    id="basic-addon1"
                  >
                    Đã trả:
                  </span>
                </div>
                <span
                  className="form-control bg-light"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                >
                  {isEditting ? formatCurrency(payed) : ""}
                </span>
              </div>
              <div
                className="input-group mb-3 bolder-border"
                style={{ width: "80%" }}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text span-of-input-group"
                    id="basic-addon1"
                  >
                    Số nợ:
                  </span>
                </div>
                <span
                  className="form-control bg-light"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                >
                  {isEditting ? formatCurrency(debt) : ""}
                </span>
              </div>
              {!isEditting ? (
                <input
                  type="submit"
                  className="btn btn-grey"
                  style={{ width: "80%" }}
                  value="Thêm thông tin khách hàng"
                ></input>
              ) : (
                <>
                  <input
                    type="submit"
                    className="btn btn-grey"
                    style={{ width: "80%" }}
                    value="Chỉnh sửa thông tin"
                  ></input>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    style={{ width: "80%" }}
                    onClick={unSelect}
                  >
                    Hủy chỉnh sửa
                  </button>
                </>
              )}
            </form>
          </div>
          <div className="col" style={{ height: "300px" }}>
            {/* list title */}
            <div
              className="d-flex flex-row align-content-center"
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
            >
              <span
                className="mt-2 text-left"
                style={{ width: "50%", fontWeight: 500 }}
              >
                Điện thoại
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "25%", fontWeight: 500 }}
              >
                Họ tên
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "25%", fontWeight: 500 }}
              >
                Số nợ
              </span>
            </div>
            <hr />
            {/* list item */}
            <div className="importMaterialList">
              {listRecord.map((item) => (
                <div className="d-flex flex-row" key={item._id}>
                  {selectedId === item._id ? (
                    <div
                      className="selected-item-mark"
                      style={{ width: "2%" }}
                    ></div>
                  ) : (
                    <></>
                  )}
                  <div style={{ width: "98%" }}>
                    <KhachHangRecordItemList
                      _id={item._id}
                      select={select}
                      name={item.name}
                      phoneNumber={item.phoneNumber}
                      total={item.total}
                      payed={item.payed}
                      debt={item.debt}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
