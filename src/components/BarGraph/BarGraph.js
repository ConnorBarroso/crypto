import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import format from "date-fns/format";
import { StyledBar } from "./BarGraph.styles";

const BarGraph = (props) => {
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
    elements: {
      bar: {
        backgroundColor: "#2172E5",
        hoverBackgroundColor: "#0062EC",
        borderRadius: 5,
        borderWidth: 0.5,
      },
    },
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
  return <StyledBar data={data} options={options} />;
};

export default BarGraph;
