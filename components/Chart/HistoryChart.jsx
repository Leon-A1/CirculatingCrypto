import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfigs/chartConfigs";
import Styles from "./Chart.module.css";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "#0abdc6",
              borderColor: "#711c91",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
      console.log(chartInstance);
    }
  });

  return (
    <div className={Styles.chartWrapper}>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>

      <div>
        <button
          onClick={() => setTimeFormat("24h")}
          className={Styles.chartButton}
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat("7d")}
          className={Styles.chartButton}
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className={Styles.chartButton}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
