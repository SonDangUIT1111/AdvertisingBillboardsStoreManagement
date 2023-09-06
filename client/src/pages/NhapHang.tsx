import { SetStateAction, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RecordItemList } from "../components/NhapHangRecordItemList";
import { ImportMaterialRecord } from "../models/importMaterialRecord";
import { formatDate } from "../utils/formatDate";
import * as ImportMaterialRecordApi from "../network/importMaterialRecord";
import { Toast } from "bootstrap";

// this page function is not separate into many file
export function NhapHang() {
  const [isEditting, setIsEditing] = useState(false);
  const [listRecord, setListRecord] = useState<ImportMaterialRecord[]>([]);
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const loadRecord = async () => {
    try {
      document.getElementById("trigger")?.click();
      await ImportMaterialRecordApi.fetchImportMaterialRecords().then(
        (data) => {
          let copyCat: ImportMaterialRecord[] = [];
          data.map((item) =>
            copyCat.push({
              _id: item._id,
              note: item.note,
              price: item.price,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            })
          );
          setListRecord(copyCat);
          document.getElementById("closeModal")?.click();
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRecord();
  }, []);

  const saveRecord = async (
    input: ImportMaterialRecordApi.ImportMaterialRecordInput
  ) => {
    try {
      if (!isEditting) {
        await ImportMaterialRecordApi.createImportMaterialRecord(input).then(
          (data) => {
            setListRecord([
              ...listRecord,
              {
                _id: data._id,
                note: data.note,
                price: data.price,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
              },
            ]);
          }
        );
        unSelect();
      } else {
        await ImportMaterialRecordApi.updateImportMaterialRecord(
          selectedId,
          input
        );
        setListRecord(
          listRecord.map((item) =>
            item._id === selectedId
              ? { ...item, note: note, price: price }
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

  const submitInfo = (event: React.FormEvent) => {
    event.preventDefault();
    if (price <= 0) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      return;
    }
    let input: ImportMaterialRecordApi.ImportMaterialRecordInput = {
      note: note,
      price: price,
    };
    saveRecord(input);
  };

  const select = (item: ImportMaterialRecord) => {
    setIsEditing(true);
    setNote(item.note);
    setPrice(item.price);
    setDate(item.createdAt);
    setSelectedId(item._id);
  };

  const unSelect = () => {
    setIsEditing(false);
    setNote("");
    setPrice(0);
    setDate("");
    setSelectedId("");
  };
  const deleteRecord = async () => {
    try {
      await ImportMaterialRecordApi.deleteImportMaterialRecord(selectedId);
      setListRecord(listRecord.filter((item) => item._id !== selectedId));
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
      console.error(error);
    }
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
                Thông tin nhập hàng
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
                    Thông tin:
                  </span>
                </div>
                <textarea
                  rows={10}
                  required
                  id="note-txt"
                  value={note}
                  className="form-control"
                  aria-label="With textarea"
                  onChange={(e) => setNote(e.target.value)}
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
                    Giá nhập:
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  value={price}
                  required
                  id="price-txt"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
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
                    Ngày nhập:
                  </span>
                </div>
                <span
                  className="form-control bg-light"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                >
                  {isEditting ? formatDate(date) : ""}
                </span>
              </div>
              {!isEditting ? (
                <input
                  type="submit"
                  className="btn btn-grey"
                  style={{ width: "80%" }}
                  value="Thêm thông tin nhập hàng"
                ></input>
              ) : (
                <>
                  <input
                    type="submit"
                    className="btn btn-grey"
                    style={{ width: "80%" }}
                    value="Chỉnh sửa thông tin"
                  ></input>
                  <div className="row">
                    <div style={{ width: "40%" }}>
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        style={{ width: "100%" }}
                        onClick={deleteRecord}
                      >
                        Xóa thông tin
                      </button>
                    </div>
                    <div style={{ width: "40%" }}>
                      <button
                        type="button"
                        className="btn btn-warning mt-2"
                        style={{ width: "100%" }}
                        onClick={unSelect}
                      >
                        Hủy chỉnh sửa
                      </button>
                    </div>
                  </div>
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
                Thông tin
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "25%", fontWeight: 500 }}
              >
                Giá nhập
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "25%", fontWeight: 500 }}
              >
                Ngày nhập
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
                    <RecordItemList
                      _id={item._id}
                      note={item.note}
                      price={item.price}
                      date={item.createdAt}
                      updateAt={item.updatedAt}
                      select={select}
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
