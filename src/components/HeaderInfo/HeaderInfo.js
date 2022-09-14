import React from "react";
import { get } from "utils";
import { ProgressBar } from "components";
import { Bar, Filled } from "../ProgressBar/ProgressBar.styles";
import { Container, StyledList, StyledItem } from "./HeaderInfo.styles";

class HeaderInfo extends React.Component {
  state = {
    data: {},
  };

  handleGet = async () => {
    const globalData = await get("global");
    this.setState({ data: globalData.data });
  };

  componentDidMount() {
    this.handleGet();
  }

  render() {
    const { data } = this.state;
    const { active_cryptocurrencies, markets, market_cap_percentage } = data;
    if (!data) {
      return <div>Loading...</div>;
    }
    const btcPercent = Math.round(market_cap_percentage?.btc);
    const ethPercent = Math.round(market_cap_percentage?.btc);
    const mainColor = "";
    const offColor = "";
    return (
      <Container>
        {data && (
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
        )}
      </Container>
    );
  }
}

export default HeaderInfo;
