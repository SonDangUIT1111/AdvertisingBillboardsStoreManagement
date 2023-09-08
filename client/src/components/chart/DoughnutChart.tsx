import { useState } from "react";
import React from "react";
import { Doughnut } from "react-chartjs-2";

type props = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
  yearString: string;
  monthString: string;
};
export function DoughnutChart({ chartData, yearString, monthString }: props) {
  return (
    <div className="chart-container" style={{ width: "462px" }}>
      <Doughnut
        style={{ marginTop: "20px" }}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Sơ đồ thu nhập mỗi loại - Tháng ${monthString} - Năm ${yearString} (Đơn vị: %)`,
            },
          },
        }}
      />
    </div>
  );
}
