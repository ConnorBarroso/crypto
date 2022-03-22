import React from "react";
import { StyledLine } from "./LineGraph.styles";
import { Chart as ChartJS } from "chart.js/auto";
import format from "date-fns/format";
import { Line } from "react-chartjs-2";

const LineGraph = (props) => {
  const { sparkline, dates } = props;
  const tooltipDates = dates?.map((i) => format(i, "dd-MM-yyyy"));
  const labelDates = dates?.map((i) => format(i, "dd"));

  const data = {
    labels: labelDates,
    datasets: [
      {
        data: sparkline,
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
        fill: true,
        borderColor: ["#00ff5f"],
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
  return <StyledLine data={data} options={options} />;
};

export default LineGraph;
