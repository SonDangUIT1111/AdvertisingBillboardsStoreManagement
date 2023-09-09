import { SetStateAction, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BangGiaRecordItemList } from "../components/BangGiaRecordItemList";
import { ServicePrice } from "../models/servicePrice";
import { formatDate } from "../utils/formatDate";
import * as ServicePriceApi from "../network/servicePrice_api";
import { Toast } from "bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { PasswordInput } from "../components/PasswordInput";

// this page function is not separate into many file
export function BangGia() {
  const [isEditting, setIsEditing] = useState(false);
  const [listRecord, setListRecord] = useState<ServicePrice[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  let stt = 1;

  const loadRecord = async () => {
    try {
      document.getElementById("trigger")?.click();
      await ServicePriceApi.fetchServicePrices().then((data) => {
        let copyCat: ServicePrice[] = [];
        data.map((item) =>
          copyCat.push({
            _id: item._id,
            serviceName: item.serviceName,
            price: item.price,
            createdAt: "",
            updatedAt: "",
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

  const saveRecord = async (input: ServicePriceApi.ServicePriceInput) => {
    try {
      await ServicePriceApi.updateServicePrice(selectedId, input);
      setListRecord(
        listRecord.map((item) =>
          item._id === selectedId
            ? { ...item, serviceName: serviceName, price: price }
            : item
        )
      );
      unSelect();

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

  const submitInfo = (event: React.FormEvent) => {
    event.preventDefault();
    let input: ServicePriceApi.ServicePriceInput = {
      serviceName: serviceName,
      price: price,
    };
    saveRecord(input);
  };

  const select = (item: ServicePrice) => {
    setPrice(item.price);
    setServiceName(item.serviceName);
    setSelectedId(item._id);
  };

  const unSelect = () => {
    setPrice(0);
    setServiceName("");
    setSelectedId("");
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
                Thông tin dịch vụ
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
                    Tên dịch vụ:
                  </span>
                </div>
                <textarea
                  minLength={4}
                  required
                  id="phone-txt"
                  value={serviceName}
                  className="form-control"
                  aria-label="With textarea"
                  disabled
                ></textarea>
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
                    Đơn giá:
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  value={price}
                  required
                  id="name-txt"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
                />
              </div>
              {selectedId === "" ? (
                <></>
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
                style={{ width: "5%", fontWeight: 500 }}
              >
                Stt
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "65%", fontWeight: 500 }}
              >
                Tên dịch vụ
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "25%", fontWeight: 500 }}
              >
                Đơn giá
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
                    <BangGiaRecordItemList
                      _id={item._id}
                      select={select}
                      stt={stt++}
                      serviceName={item.serviceName}
                      price={item.price}
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
