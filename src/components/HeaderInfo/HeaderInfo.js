import React from "react";
import { get } from "utils";

class HeaderInfo extends React.Component {
  state = {
    data: {},
    loading: true,
  };

  handleGet = async () => {
    const globalData = await get("global");
    this.setState({ data: globalData.data, loading: false });
  };

  componentDidMount() {
    this.handleGet();
  }

  render() {
    const { data, loading } = this.state;
    const { active_cryptocurrencies, markets, market_cap_percentage } = data;
    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data && (
              <ul>
                <li>Coins: {active_cryptocurrencies}</li>
                <li>Exchange: {markets}</li>
                <li>BTC: {Math.round(market_cap_percentage.btc)}%</li>
                <li>ETH: {Math.round(market_cap_percentage.eth)}%</li>
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default HeaderInfo;
