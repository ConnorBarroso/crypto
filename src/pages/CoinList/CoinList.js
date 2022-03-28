import React from "react";
import { ListedCoin, Carousel } from "components";
import { get, getCoinList, getGraphData, rounding } from "utils";
import { LineGraph, BarGraph } from "components";
import {
  GraphContainer,
  GraphLabelContainer,
  LabelSymbol,
  LabelValue,
  LabelDate,
  LabelVolume,
} from "./CoinList.Styles";
import format from "date-fns/format";

class CoinList extends React.Component {
  state = {
    list: null,
    graphData: null,
    top: true,
    displayOrder: "current_price",
    descending: true,
  };

  async componentDidMount() {
    const graphData = await getGraphData(this.props.fetchData);
    const list = await getCoinList(this.props.fetchData);
    this.setState({ list, graphData });
  }
  async componentDidUpdate(prevProps) {
    const prevFetchData = prevProps.fetchData;
    const fetchData = this.props.fetchData;
    if (prevFetchData !== fetchData) {
      const list = await getCoinList(fetchData);
      this.setState({ list });
      if (
        prevFetchData.currency.string !== fetchData.currency.string ||
        prevFetchData.days !== fetchData.days
      ) {
        const graphData = await getGraphData(fetchData);
        this.setState({ graphData });
      }
    }
  }

  handleTopToggle = (direction) => {
    this.setState({ top: !this.state.top });
    this.props.handleFetchDataChange("order", direction);
  };

  handleDisplayOrderChange = (display) => {
    this.setState({ displayOrder: display });
  };

  handleDescendingToggle = () => {
    this.setState({ descending: !this.state.descending });
  };

  render() {
    const { list, top, descending, displayOrder, graphData } = this.state;
    const symbol = this.props.fetchData.currency.symbol;

    let direction;
    if (!top) {
      direction = "desc";
    } else {
      direction = "asc";
    }
    const coinList = list;
    const sorted = coinList?.sort((a, b) => {
      if (!descending) {
        return a[displayOrder] - b[displayOrder];
      }
      return b[displayOrder] - a[displayOrder];
    });

    const priceSparkline = graphData?.prices?.map((i) => rounding(i[1]));
    const priceDates = graphData?.prices?.map((i) => i[0]);
    const volumeSparkline = graphData?.total_volumes.map((i) => rounding(i[1]));
    const volumeDates = graphData?.total_volumes.map((i) => i[0]);
    const currentDate = priceDates?.[priceDates?.length - 1];
    const formatCurrentDate = currentDate && format(currentDate, "MMM d, y");
    return (
      <div>
        <div>
          {!list || !graphData ? (
            <div>Loading...</div>
          ) : (
            <>
              <Carousel>
                <GraphContainer>
                  <GraphLabelContainer>
                    <LabelSymbol>{sorted?.[0]?.symbol}</LabelSymbol>
                    <LabelValue>
                      {symbol}
                      {sorted?.[0]?.current_price}
                    </LabelValue>
                    <LabelDate>{formatCurrentDate}</LabelDate>
                  </GraphLabelContainer>
                  <LineGraph dates={priceDates} sparkline={priceSparkline} />
                </GraphContainer>
                <GraphContainer>
                  <GraphLabelContainer>
                    <LabelVolume>Volume 24h</LabelVolume>
                    <LabelValue>
                      {symbol}
                      {volumeSparkline[volumeSparkline.length - 1]}
                    </LabelValue>
                    <LabelDate>{formatCurrentDate}</LabelDate>
                  </GraphLabelContainer>

                  <BarGraph dates={volumeDates} sparkline={volumeSparkline} />
                </GraphContainer>
              </Carousel>

              <div>
                <button
                  onClick={() =>
                    this.props.handleFetchDataChange("sortBy", "market_cap")
                  }
                >
                  Sort by market cap
                </button>
                <button
                  onClick={() =>
                    this.props.handleFetchDataChange("sortBy", "volume")
                  }
                >
                  Sort by volume
                </button>
                <button onClick={() => this.handleTopToggle(direction)}>
                  {top ? "Top 10" : "Bottom 10"}
                </button>
              </div>
              <div>
                <button onClick={this.handleDescendingToggle}>
                  {descending ? "Descending" : "Ascending"}
                </button>
                <button
                  onClick={() => this.handleDisplayOrderChange("current_price")}
                >
                  Highest Price
                </button>
                <button
                  onClick={() =>
                    this.handleDisplayOrderChange(
                      "price_change_percentage_1h_in_currency"
                    )
                  }
                >
                  % change 1 hour
                </button>
                <button
                  onClick={() =>
                    this.handleDisplayOrderChange(
                      "price_change_percentage_24h_in_currency"
                    )
                  }
                >
                  % change 1 day
                </button>
                <button
                  onClick={() =>
                    this.handleDisplayOrderChange(
                      "price_change_percentage_7d_in_currency"
                    )
                  }
                >
                  % change 7 days
                </button>
              </div>
              {sorted?.map((i) => (
                <ListedCoin key={i.id} symbol={symbol} data={i} />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default CoinList;
