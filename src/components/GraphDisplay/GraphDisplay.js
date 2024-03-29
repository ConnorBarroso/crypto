import React from "react";
import { Carousel, LineGraph, BarGraph } from "components";
import { getGraphData } from "utils";
import {
  Container,
  DesktopGraphContainer,
  MobileGraphContainer,
  ButtonContainer,
  DayButton,
} from "./GraphDisplay.styles";
class GraphDisplay extends React.Component {
  state = {
    days: 30,
    chartData: {},
    year: false,
    error: false,
    loading: false,
  };

  handleDayChange = (num) => {
    this.setState({ days: num });
    localStorage.setItem("days", num);
  };

  handleGet = async () => {
    this.setState({ loading: true, error: false });
    const graphData = await getGraphData({
      id: "bitcoin",
      currency: this.props.currency,
      days: this.state.days,
    });
    if (graphData instanceof Error === true) {
      this.setState({ error: true, loading: false });
      return;
    }
    this.setState({ chartData: graphData, loading: false });
  };

  componentDidMount() {
    const localDays = Number(localStorage.getItem("days"));
    this.setState({ days: localDays });
    this.handleGet();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.currency !== this.props.currency ||
      prevState.days !== this.state.days
    ) {
      this.handleGet();
    }
  }
  dateArray = [7, 30, 60, 90, 180, 365];
  render() {
    const currency = this.props.currency;
    const { prices } = this.state.chartData;
    const volumes = this.state.chartData.total_volumes;
    const { days, loading, error } = this.state;
    return (
      <Container>
        {!error ? (
          <>
            <MobileGraphContainer>
              <Carousel>
                <LineGraph
                  currency={currency}
                  prices={prices}
                  loading={loading}
                />
                <BarGraph
                  currency={currency}
                  volumes={volumes}
                  loading={loading}
                />
              </Carousel>
            </MobileGraphContainer>

            <DesktopGraphContainer>
              <LineGraph
                currency={currency}
                prices={prices}
                loading={loading}
              />
              <BarGraph
                currency={currency}
                volumes={volumes}
                loading={loading}
              />
            </DesktopGraphContainer>
            <ButtonContainer>
              {this.dateArray.map((num) => {
                if (days === num) {
                  return (
                    <DayButton
                      key={num}
                      active
                      onClick={() => this.handleDayChange(num)}
                    >
                      {num}
                    </DayButton>
                  );
                }
                return (
                  <DayButton
                    key={num}
                    onClick={() => this.handleDayChange(num)}
                  >
                    {num}
                  </DayButton>
                );
              })}
            </ButtonContainer>
          </>
        ) : (
          <>
            <h1 style={{ color: "red" }}> SOMETHING'S GONE WRONG!</h1>
            <button onClick={this.handleGet}>retry</button>
          </>
        )}
      </Container>
    );
  }
}

export default GraphDisplay;
