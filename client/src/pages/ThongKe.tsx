import "../styles/styles.css";
import imageToAdd1 from "../styles/images/chart1.png";
import imageToAdd2 from "../styles/images/chart2.png";
import imageToAdd3 from "../styles/images/chart3.png";
import imageToAdd4 from "../styles/images/chart4.png";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { DoughnutChart } from "../components/chart/DoughnutChart";
import { BarChart } from "../components/chart/BarChart";
import { LineChart } from "../components/chart/LineChart";
import { Revenue } from "../models/revenue";
import * as RevenueApi from "../network/revenue_api";
import { formatCurrency } from "../utils/formatCurrency";
import { PasswordInput } from "../components/PasswordInput";

Chart.register(CategoryScale);
export function ThongKe() {
  const [incomeOfEachType, setIncomeOfEachType] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [orderAmountOfEach, setOrderAmountOfEach] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  let [listRevenue, setListRevenue] = useState<Revenue[]>([]);
  const [listMonth, setListMonth] = useState<number[]>([]);
  const [listYear, setListYear] = useState<number[]>([]);
  let [selectedYear, setSelectedYear] = useState("");
  let [selectedMonth, setSelectedMonth] = useState("");
  const [chartDataDoughnut, setChartDataDoughnut] = useState({
    labels: ["Decal", "Băng rôn", "Bảng hiệu", "Khác"],
    datasets: [
      {
        label: "Tổng thu",
        data: [100203020, 405064640, 24024241, 42423425],
        backgroundColor: [
          "rgb(255, 182, 150)",
          "rgb(19, 241, 164)",
          "rgb(252, 143, 156)",
          "rgb(6, 217, 225)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataBar, setChartDataBar] = useState({
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Tổng thu",
        data: [100, 210, 302, 123, 667, 353, 567, 578, 886, 432, 224, 245],
        backgroundColor: "rgba(19, 241, 164,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Tổng chi",
        data: [100, 102, 402, 100, 210, 302, 123, 667, 353, 567, 578, 886],
        backgroundColor: "rgba(252, 143, 156,0.4)",
        borderColor: "rgba(255,159,4,1)",
      },
    ],
  });

  const [chartDataLine, setChartDataLine] = useState({
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Decal",
        data: [2, 1, 4, 7, 4, 6, 3, 2, 8, 9, 12, 6],
        borderColor: "rgb(255, 182, 150)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Băng rôn",
        data: [6, 4, 3, 6, 3, 7, 8, 3, 5, 2, 9, 6],
        borderColor: "rgb(19, 241, 164)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Bảng hiệu",
        data: [6, 4, 3, 4, 3, 6, 7, 8, 3, 5, 7, 5],
        borderColor: "rgb(252, 143, 156)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Khác",
        data: [6, 4, 3, 2, 4, 6, 7, 4, 6, 3, 2, 7],
        borderColor: "rgb(6, 217, 225)",
        fill: false,
        tension: 0.4,
      },
    ],
  });

  const loadRevenues = async () => {
    try {
      await RevenueApi.fetchRevenues().then((data) => {
        let copyCat: Revenue[] = [];
        data.map((item) => {
          copyCat.push({
            _id: item._id,
            totalIncome: item.totalIncome,
            totalOutcome: item.totalOutcome,
            month: item.month,
            year: item.year,
            kindRevenue: {
              incomeDecal: item.kindRevenue.incomeDecal,
              incomeBangRon: item.kindRevenue.incomeBangRon,
              incomeBangHieu: item.kindRevenue.incomeBangHieu,
              incomeKhac: item.kindRevenue.incomeKhac,
              decalOrder: item.kindRevenue.decalOrder,
              bangRonOrder: item.kindRevenue.bangRonOrder,
              bangHieuOrder: item.kindRevenue.bangHieuOrder,
              khacOrder: item.kindRevenue.khacOrder,
            },
            createdAt: "",
            updatedAt: "",
          });
        });
        listRevenue = copyCat;
        setListRevenue(copyCat);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadDataComboboxYear = () => {
    try {
      let copyYear: number[] = [];
      listRevenue.map((item) => {
        if (copyYear.filter((obj) => obj === item.year).length === 0)
          copyYear.push(item.year);
      });
      selectedYear = copyYear[0].toString();
      setSelectedYear(copyYear[0].toString());
      loadDataComboboxMonth(copyYear[0]);
      setListYear(copyYear);
    } catch (error) {
      console.error(error);
    }
  };
  const loadDataComboboxMonth = (value: number) => {
    try {
      let copyMonth: number[] = [];
      listRevenue.map((item) => {
        if (item.year === value) {
          copyMonth.push(item.month);
        }
      });
      changeMonth(copyMonth[0]);
      setListMonth(copyMonth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRevenues().then((data) => {
      loadDataComboboxYear();
    });
  }, []);

  const loadRevenueGraphic = () => {
    console.log("load lai bieu do cua" + selectedMonth + "/" + selectedYear);
    // proceed chart bar
    let income: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let outcome: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let decalOrder: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let bangRonOrder: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let bangHieuOrder: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let khacOrder: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let percentOfType: number[] = [25, 25, 25, 25];
    listRevenue.map((item) => {
      if (item.year === parseInt(selectedYear)) {
        income[item.month - 1] = item.totalIncome;
        outcome[item.month - 1] = item.totalOutcome;
        decalOrder[item.month - 1] = item.kindRevenue.decalOrder;
        bangRonOrder[item.month - 1] = item.kindRevenue.bangRonOrder;
        bangHieuOrder[item.month - 1] = item.kindRevenue.bangHieuOrder;
        khacOrder[item.month - 1] = item.kindRevenue.khacOrder;
        if (item.month === parseInt(selectedMonth)) {
          setIncomeOfEachType([
            item.kindRevenue.incomeDecal,
            item.kindRevenue.incomeBangRon,
            item.kindRevenue.incomeBangHieu,
            item.kindRevenue.incomeKhac,
          ]);
          setOrderAmountOfEach([
            item.kindRevenue.decalOrder,
            item.kindRevenue.bangRonOrder,
            item.kindRevenue.bangHieuOrder,
            item.kindRevenue.khacOrder,
          ]);
          console.log(
            `${item.kindRevenue.incomeDecal} / ${item.totalIncome} = ${
              (item.kindRevenue.incomeDecal / item.totalIncome) * 100
            }`
          );
          percentOfType[0] =
            (item.kindRevenue.incomeDecal / item.totalIncome) * 100;
          percentOfType[1] =
            (item.kindRevenue.incomeBangRon / item.totalIncome) * 100;
          percentOfType[2] =
            (item.kindRevenue.incomeBangHieu / item.totalIncome) * 100;
          percentOfType[3] =
            (item.kindRevenue.incomeKhac / item.totalIncome) * 100;
        }
      }
    });
    setChartDataBar({
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Tổng thu",
          data: income,
          backgroundColor: "rgba(19, 241, 164,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Tổng chi",
          data: outcome,
          backgroundColor: "rgba(252, 143, 156,0.4)",
          borderColor: "rgba(255,159,4,1)",
        },
      ],
    });
    //proceed line bar
    setChartDataLine({
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Decal",
          data: decalOrder,
          borderColor: "rgb(255, 182, 150)",
          fill: false,
          tension: 0.4,
        },
        {
          label: "Băng rôn",
          data: bangRonOrder,
          borderColor: "rgb(19, 241, 164)",
          fill: false,
          tension: 0.4,
        },
        {
          label: "Bảng hiệu",
          data: bangHieuOrder,
          borderColor: "rgb(252, 143, 156)",
          fill: false,
          tension: 0.4,
        },
        {
          label: "Khác",
          data: khacOrder,
          borderColor: "rgb(6, 217, 225)",
          fill: false,
          tension: 0.4,
        },
      ],
    });
    //proceed dougnut char
    setChartDataDoughnut({
      labels: ["Decal", "Băng rôn", "Bảng hiệu", "Khác"],
      datasets: [
        {
          label: "Tổng thu",
          data: percentOfType,
          backgroundColor: [
            "rgb(255, 182, 150)",
            "rgb(19, 241, 164)",
            "rgb(252, 143, 156)",
            "rgb(6, 217, 225)",
          ],
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    });
  };
  const changeYear = (value: number) => {
    selectedYear = value.toString();
    setSelectedYear(value.toString());
    loadDataComboboxMonth(value);
  };
  const changeMonth = (value: number) => {
    selectedMonth = value.toString();
    setSelectedMonth(value.toString());
    loadRevenueGraphic();
  };

  return (
    <>
      <PasswordInput />
      <div className="row">
        <div className="col box-thong-ke linear-orange">
          <h4 className="title-box">{formatCurrency(incomeOfEachType[0])}</h4>
          <div className="d-flex justify-content-between">
            <h6 className="title-type">{orderAmountOfEach[0]} decal</h6>
            <img src={imageToAdd1} className="image-box" />
          </div>
          <div className="line-white"></div>
          <h6 className="content-type">
            🕛 Update: {selectedMonth}-{selectedYear}
          </h6>
        </div>
        <div className="col box-thong-ke linear-green">
          <h4 className="title-box">{formatCurrency(incomeOfEachType[1])}</h4>
          <div className="d-flex justify-content-between">
            <h6 className="title-type">{orderAmountOfEach[1]} băng rôn</h6>
            <img src={imageToAdd2} className="image-box" />
          </div>
          <div className="line-white"></div>
          <h6 className="content-type">
            🕛 Update: {selectedMonth}-{selectedYear}
          </h6>
        </div>
        <div className="col box-thong-ke linear-pink">
          <h4 className="title-box">{formatCurrency(incomeOfEachType[2])}</h4>
          <div className="d-flex justify-content-between">
            <h6 className="title-type">{orderAmountOfEach[2]} bảng hiệu</h6>
            <img src={imageToAdd3} className="image-box" />
          </div>
          <div className="line-white"></div>
          <h6 className="content-type">
            🕛 Update: {selectedMonth}-{selectedYear}
          </h6>
        </div>
        <div className="col box-thong-ke linear-blue">
          <h4 className="title-box">{formatCurrency(incomeOfEachType[3])}</h4>
          <div className="d-flex justify-content-between">
            <h6 className="title-type">{orderAmountOfEach[3]} đơn hàng khác</h6>
            <img src={imageToAdd4} className="image-box" />
          </div>
          <div className="line-white"></div>
          <h6 className="content-type">
            🕛 Update: {selectedMonth}-{selectedYear}
          </h6>
        </div>
      </div>
      <div className="mb-2">
        <BarChart chartData={chartDataBar} yearString={selectedYear} />
      </div>
      <div className="d-flex flex-row">
        <LineChart chartData={chartDataLine} yearString={selectedYear} />
        <DoughnutChart
          chartData={chartDataDoughnut}
          yearString={selectedYear}
          monthString={selectedMonth}
        />
      </div>
      <div
        className="d-flex flex-row mt-1 sticky-bottom align-items-center shadow"
        style={{
          height: "80px",
          backgroundColor: "#fff",
          border: "#ccc 2px solid",
        }}
      >
        <h6 className="mt-2 me-2 ms-2" style={{ width: "4%" }}>
          Bộ lọc:{" "}
        </h6>
        <div className="dropdown me-2" style={{ width: "50%" }}>
          <button
            style={{ width: "100%" }}
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Năm {selectedYear}
          </button>
          <ul className="dropdown-menu dropdown-menu" style={{ width: "96%" }}>
            {listYear.map((item) => (
              <li key={Math.floor(Math.random() * Date.now()).toString(36)}>
                <button
                  className="dropdown-item"
                  style={{ width: "100%" }}
                  onClick={() => {
                    changeYear(item);
                  }}
                >
                  Năm {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown" style={{ width: "46%" }}>
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: "100%" }}
          >
            Tháng {selectedMonth}
          </button>
          <ul className="dropdown-menu dropdown-menu" style={{ width: "96%" }}>
            {listMonth.map((item) => (
              <li key={Math.floor(Math.random() * Date.now()).toString(36)}>
                <button
                  className="dropdown-item"
                  style={{ width: "100%" }}
                  onClick={() => {
                    changeMonth(item);
                  }}
                >
                  Tháng {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
