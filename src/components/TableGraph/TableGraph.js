import { Chart } from "react-chartjs-2";
import { Container } from "./TableGraph.styles";
import { rounding } from "utils";

const TableGraph = ({ sparkline, percentage }) => {
  const prices = sparkline?.price.map((number) => JSON.parse(rounding(number)));
  const reducedPrices = prices?.filter((element, i) => i % 5 === 5 - 1);
  const indexes = reducedPrices.map((element, i) => i);

  const stringPercentage = `${percentage}`;
  const color = () => {
    if (stringPercentage.includes("-")) {
      return "red";
    }
    return "#00ff5f";
  };

  const data = {
    labels: indexes,
    datasets: [
      {
        borderColor: color,
        data: reducedPrices,
        backgroundColor: "red",
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

    scales: {
      x: {
        display: false,
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

  return (
    <Container>
      <Chart data={data} type="line" options={options}></Chart>
    </Container>
  );
};

export default TableGraph;
