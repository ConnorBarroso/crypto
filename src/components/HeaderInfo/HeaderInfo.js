import React from "react";
import ReactLoading from "react-loading";
import { get } from "utils";
import { ProgressBar } from "components";
import { Container, StyledList, StyledItem } from "./HeaderInfo.styles";

class HeaderInfo extends React.Component {
  state = {
    data: {},
    error: false,
    loading: false,
  };

  handleGet = async () => {
    this.setState({ loading: true, error: false });
    const globalData = await get("global");
    if (globalData instanceof Error === true) {
      this.setState({ error: true, loading: false });
      return;
    }
    this.setState({ data: globalData.data, loading: false });
  };

  componentDidMount() {
    this.handleGet();
  }

  render() {
    const { data, loading, error } = this.state;
    const { active_cryptocurrencies, markets, market_cap_percentage } = data;
    const btcPercent = Math.round(market_cap_percentage?.btc);
    const ethPercent = Math.round(market_cap_percentage?.btc);
    return (
      <Container>
        {!loading && !error ? (
          <StyledList>
            <StyledItem>Coins: {active_cryptocurrencies}</StyledItem>
            <StyledItem>Exchange: {markets}</StyledItem>
            <StyledItem>
              BTC:
              <ProgressBar
                percentage={btcPercent}
                mainColor={"white"}
                offColor={"blue"}
                compact={true}
              />
            </StyledItem>
            <StyledItem>
              <span>ETH:</span>
              <ProgressBar
                percentage={ethPercent}
                mainColor={"white"}
                offColor={"blue"}
                compact={true}
              />
            </StyledItem>
          </StyledList>
        ) : error ? (
          <>
            <h4 style={{ color: "red" }}> err</h4>
            <button onClick={this.handleGet}>retry</button>
          </>
        ) : (
          <ReactLoading type={"spin"} />
        )}
      </Container>
    );
  }
}

export default HeaderInfo;
