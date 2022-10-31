import React from "react";
import ReactLoading from "react-loading";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import format from "date-fns/format";
import {
  StyledLine,
  GraphLabelContainer,
  LabelValue,
  LabelDate,
  GraphContainer,
} from "./LineGraph.styles";
import { rounding } from "utils";

const LineGraph = (props) => {
  const priceSparkline = props.prices?.map((i) => rounding(i[1]));
  const dates = props.prices?.map((i) => i[0]);
  const labelDates = dates?.map((i) => format(i, "dd"));
  const tooltipDates = dates?.map((i) => format(i, "dd-MM-yyyy"));
  const loading = props.loading;

  const priceFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: props.currency,
  });

  let displayData = {};
  if (priceSparkline) {
    displayData = {
      price: priceFormatter.format(
        rounding(priceSparkline[priceSparkline.length - 1])
      ),
      date: format(dates[dates.length - 1], "MMMM dd, yyyy"),
    };
  }

  const data = {
    labels: labelDates,
    datasets: [
      {
        data: priceSparkline,
        borderColor: "#0CF864",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 120, 0, 350);
          gradient.addColorStop(0, "rgba(0, 255, 95, .5)");
          gradient.addColorStop(1, "rgba(0, 255, 95, .1)");
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem, data) => {
            const title = tooltipDates[tooltipItem?.[0]?.dataIndex];
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
  const { price, date } = displayData;
  return (
    <GraphContainer>
      {!loading ? (
        <>
          <GraphLabelContainer>
            <div>Bitcoin</div>
            Price
            <LabelValue>{price}</LabelValue>
            <LabelDate>{date}</LabelDate>
          </GraphLabelContainer>
          <StyledLine type="line" data={data} options={options} />
        </>
      ) : (
        <ReactLoading type={"spin"} />
      )}
    </GraphContainer>
  );
};

export default LineGraph;
