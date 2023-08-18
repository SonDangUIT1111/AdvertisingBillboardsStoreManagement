import "bootstrap";
import { useState } from "react";
type SearchBarProps = {
  areaIndex: string;
  listInfo: any[];
  copyList: {
    id: number;
    phoneNumber: string;
    name: string;
    note: string;
    height: number;
    width: number;
    price: number;
    discount: number;
    deposit: number;
    state: string;
    dateOrder: string;
    total: number;
  }[];
  setListInfo: React.Dispatch<React.SetStateAction<any>>;
};
export function SearchBar({
  areaIndex,
  listInfo,
  copyList,
  setListInfo,
}: SearchBarProps) {
  const filterList = (e: React.FormEvent) => {
    e.preventDefault();
    setListInfo(
      copyList.filter((info) => info.phoneNumber.includes(searchWord) === true)
    );
  };
  const [searchWord, setSearchWord] = useState("");
  return (
    <nav>
      <form className="d-flex flex-row mb-3" onSubmit={(e) => filterList(e)}>
        {areaIndex === "1" ? (
          <a
            href={`/hoadon/decal/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "2" ? (
          <a
            href={`/hoadon/bangron/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "3" ? (
          <a
            href={`/hoadon/banghieu/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "4" ? (
          <a
            href={`/hoadon/hopden/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "5" ? (
          <a
            href={`/hoadon/tanhon/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : (
          <a
            href={`/hoadon/khac/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        )}
        <input
          className="form-control mr-sm-2 ml-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 submit-custom mr-3"
          type="submit"
          id="btnSearch"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
