import { useState } from "react";
import React from "react";
import { Bar } from "react-chartjs-2";

type props = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  yearString: string;
};

export function BarChart({ chartData, yearString }: props) {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Sơ đồ tổng thu - tổng chi năm ${yearString} (Đơn vị: Đồng)`,
            },
          },
        }}
      />
    </div>
  );
}
