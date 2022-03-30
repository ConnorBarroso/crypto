import React from "react";
import { get } from "utils";
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
    return (
      <Container>
        {data && (
          <StyledList>
            <StyledItem>Coins: {active_cryptocurrencies}</StyledItem>
            <StyledItem>Exchange: {markets}</StyledItem>
            <StyledItem>
              BTC: {Math.round(market_cap_percentage?.btc)}%
            </StyledItem>
            <StyledItem>
              ETH: {Math.round(market_cap_percentage?.eth)}%
            </StyledItem>
          </StyledList>
        )}
      </Container>
    );
  }
}

export default HeaderInfo;
