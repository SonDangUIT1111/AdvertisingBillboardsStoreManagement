import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RecordItemList } from "../components/NhapHangRecordItemList";
import { ImportMaterialRecord } from "../models/importMaterialRecord";
import { formatDate } from "../utils/formatDate";
import * as ImportMaterialRecordApi from "../network/importMaterialRecord";
import { Toast } from "bootstrap";

// this page function is not separate into many file
export function NhapHang() {
  let isEditting = false;
  const [listRecord, setListRecord] = useState<ImportMaterialRecord[]>([]);
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");

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
      const input1 = document.getElementById("note-txt") as HTMLInputElement;
      input1.value = "";
      const input2 = document.getElementById("price-txt") as HTMLInputElement;
      input2.value = "";
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
    if (!isEditting) {
      let input: ImportMaterialRecordApi.ImportMaterialRecordInput = {
        note: note,
        price: price,
      };
      saveRecord(input);
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
            <div className="toast-body">Thêm thông tin thành công.</div>
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
              Thêm thông tin thất bại, thông tin lỗi.
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
                  {date}
                </span>
              </div>
              <input
                type="submit"
                className="btn btn-grey"
                style={{ width: "80%" }}
                value="Xác nhận thông tin"
              ></input>
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
                style={{ width: "33%", fontWeight: 500 }}
              >
                Thông tin
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "33%", fontWeight: 500 }}
              >
                Giá nhập
              </span>
              <span
                className="mt-2 text-left"
                style={{ width: "33%", fontWeight: 500 }}
              >
                Ngày nhập
              </span>
            </div>
            <hr />
            {/* list item */}
            {listRecord.map((item) => (
              <RecordItemList
                key={item._id}
                note={item.note}
                price={item.price}
                date={item.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
