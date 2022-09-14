import { Chart } from "react-chartjs-2";
import { Container } from "./TableGraph.styles";
import { rounding } from "utils";

const TableGraph = ({ sparkline, percentage }) => {
  const prices = sparkline?.price.map((number) => JSON.parse(rounding(number)));

  const stringPercentage = `${percentage}`;
  const reducedPrices = prices?.filter((element, i) => i % 5 === 5 - 1);
  const indexes = reducedPrices?.map((element, i) => i);

  const color = () => {
    if (stringPercentage?.includes("-")) {
      return "red";
    }
    return "#00ff5f";
  };

  let data = {
    labels: indexes,
    datasets: [
      {
        borderColor: color,
        data: reducedPrices,
        backgroundColor: "red",
        indexAxis: "x",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      point: {
        pointRadius: 0,
      },
      line: {
        tension: 0.5,
      },
    },
    animation: false,
    scales: {
      x: {
        type: "linear",
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <Container>
      <Chart data={data} type="line" options={options} />
    </Container>
  );
};

export default TableGraph;
