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
  };

  handleDayChange = (num) => {
    this.setState({ days: num });
    localStorage.setItem("days", num);
  };

  handleGet = async () => {
    const graphData = await getGraphData({
      id: "bitcoin",
      currency: this.props.currency,
      days: this.state.days,
    });
    this.setState({ chartData: graphData });
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
    const { prices } = this.state.chartData;
    const volumes = this.state.chartData.total_volumes;
    const days = this.state.days;
    return (
      <Container>
        <MobileGraphContainer>
          <Carousel>
            <LineGraph currency={this.props.currency} prices={prices} />
            <BarGraph currency={this.props.currency} volumes={volumes} />
          </Carousel>
        </MobileGraphContainer>

        <DesktopGraphContainer>
          <LineGraph currency={this.props.currency} prices={prices} />
          <BarGraph currency={this.props.currency} volumes={volumes} />
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
              <DayButton key={num} onClick={() => this.handleDayChange(num)}>
                {num}
              </DayButton>
            );
          })}
        </ButtonContainer>
      </Container>
    );
  }
}

export default GraphDisplay;
