import React, { useRef, useState, useEffect } from "react";
import {
  StyledLine,
  GraphLabelContainer,
  LabelSymbol,
  LabelValue,
  LabelDate,
  LabelVolume,
  GraphContainer,
} from "./LineGraph.styles";
import { Chart as ChartJS } from "chart.js";
import format from "date-fns/format";
import { getGraphData, rounding } from "utils";

class LineGraph extends React.Component {
  state = {
    graph: null,
    data: null,
  };

  createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "grey");
    gradient.addColorStop(1, "blue");
    return gradient;
  };

  chartRef = React.createRef();

  dates = this.state.graph?.prices?.map((i) => i[0]);

  async componentDidMount() {
    console.log("chartRef:", this.chartRef);

    const graphData = await getGraphData(this.props.fetchData);
    this.setState({ graph: graphData });

    const priceSparkline = this.state.graph?.prices?.map((i) => rounding(i[1]));

    const labelDates = this.dates?.map((i) => format(i, "dd"));

    const chart = this.chartRef?.current;
    console.log("chart:", chart);
    if (chart) {
      const ctx = chart.ctx;

      // let priceSparkline = {
      //   datasets: [],
      // };

      const background = this.createGradient(ctx);

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
            data: priceSparkline,
            backgroundColor: background,
          },
        ],
      };
      this.setState({ data });
    }
  }

  render() {
    const tooltipDates = this.dates?.map((i) => format(i, "dd-MM-yyyy"));
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

    return (
      <GraphContainer>
        <GraphLabelContainer>
          <LabelSymbol>{this.props.sorted?.[0]?.symbol}</LabelSymbol>
          <LabelValue>
            {this.props.symbol}
            {this.props.sorted?.[0]?.current_price}
          </LabelValue>
          <LabelDate>{this.props.formatCurrentDate}</LabelDate>
        </GraphLabelContainer>
        <StyledLine
          data={this.state.data}
          ref={this.chartRef}
          type="line"
          options={options}
        />
      </GraphContainer>
    );
  }
}

export default LineGraph;
