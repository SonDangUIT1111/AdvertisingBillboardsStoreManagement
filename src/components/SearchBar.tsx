import "bootstrap";

export function SearchBar() {
  return (
    <nav>
      <form className="d-flex flex-row mb-3">
        <button className="btn btn-outline-secondary mr-10 add-custom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
          Thêm đơn hàng mới
        </button>
        <input
          className="form-control mr-sm-2 ml-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 submit-custom"
          type="submit"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
