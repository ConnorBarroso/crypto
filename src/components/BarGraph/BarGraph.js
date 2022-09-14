import React from "react";
import format from "date-fns/format";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { StyledBar, buttonContainer } from "./BarGraph.styles";
import {
  GraphContainer,
  GraphLabelContainer,
  LabelValue,
  LabelDate,
} from "components/LineGraph/LineGraph.styles";
import { rounding } from "utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

const BarGraph = (props) => {
  const { volumes, currency } = props;

  const volumeArray = volumes?.map((i) => rounding(i[1]));

  const dates = volumes?.map((i) => i[0]);
  const tooltipDates = dates?.map((i) => format(i, "dd-MM-yyyy"));
  const labelDates = dates?.map((i) => format(i, "dd"));

  const priceFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  });

  let displayData = {};
  if (volumeArray) {
    displayData = {
      volume: priceFormatter.format(
        rounding(volumeArray[volumeArray.length - 1])
      ),
      date: format(dates[dates.length - 1], "MMMM dd, yyyy"),
    };
  }

  let data = {
    labels: labelDates,
    datasets: [
      {
        barPercentage: 1,
        data: volumeArray,
      },
    ],
  };

  const options = {
    elements: {
      bar: {
        backgroundColor: "#2172E5",
        hoverBackgroundColor: "#0062EC",
        borderRadius: 5,
        borderWidth: 0.1,
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
  const { volume, date } = displayData;
  return (
    <GraphContainer>
      {displayData && (
        <GraphLabelContainer>
          <div>Bitcoin</div>
          Volume
          <LabelValue>{volume}</LabelValue>
          <LabelDate>{date}</LabelDate>
        </GraphLabelContainer>
      )}
      {<StyledBar type="bar" data={data} options={options} />}
    </GraphContainer>
  );
};

export default BarGraph;
