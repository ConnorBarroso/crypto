import React, { useRef, useState, useEffect } from "react";
import { StyledLine } from "./LineGraph.styles";
import { Chart as ChartJS } from "chart.js";
import format from "date-fns/format";

const LineGraph = ({ sparkline, dates }) => {
  const tooltipDates = dates?.map((i) => format(i, "dd-MM-yyyy"));
  const labelDates = dates?.map((i) => format(i, "dd"));

  const data = {
    labels: labelDates,
    datasets: [
      {
        borderColor: "#ff6c23",
        borderWidth: 2,
        pointColor: "#fff",
        pointStrokeColor: "#ff6c23",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#ff6c23",
        data: sparkline,
        backgroundColor: "black",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem, data) => {
            const title = tooltipDates[tooltipItem[0].dataIndex];
            return title;
          },
        },
      },
    },

    elements: {
      line: {
        borderColor: "#00ff5f",
        tension: 0.1,
      },
      point: {
        radius: 0,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };
  return <StyledLine data={data} type="line" options={options} />;
};

export default LineGraph;
