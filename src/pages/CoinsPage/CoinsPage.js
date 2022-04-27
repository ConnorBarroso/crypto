import React from "react";
import { get, getCoinList, getGraphData, rounding } from "utils";
import { TableDisplay, GraphDisplay } from "components";
import { DesktopGraphContainer, PageContainer } from "./CoinsPage.styles";
import format from "date-fns/format";

class CoinsPage extends React.Component {
  state = {
    list: null,
    graphData: null,
    top: true,
    displayOrder: "current_price",
    descending: true,
    loading: true,
  };

  async componentDidMount() {
    const list = await getCoinList(this.props.fetchData);
    this.setState({ list, loading: false });
  }

  async componentDidUpdate(prevProps) {
    const prevFetchData = prevProps.fetchData;
    const fetchData = this.props.fetchData;
    if (prevFetchData !== fetchData) {
      this.setState({ loading: true });
      if (prevFetchData.page !== fetchData.page) {
        const nextPage = await getCoinList(fetchData);
        const fullList = this.state.list.concat(nextPage);
        this.setState({ list: fullList, loading: false });
        return;
      }
      const list = await getCoinList(fetchData);
      this.setState({ list, loading: false });
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
    const { list, top, descending, displayOrder, graphData, loading } =
      this.state;
    const { symbol, string } = this.props.fetchData.currency;

    const coinList = list;
    const sorted = coinList?.sort((a, b) => {
      if (!descending) {
        return a[displayOrder] - b[displayOrder];
      }
      return b[displayOrder] - a[displayOrder];
    });
    const topCoin = sorted?.[0];
    const volumeSparkline = graphData?.total_volumes.map((i) => rounding(i[1]));
    const volumeDates = graphData?.total_volumes.map((i) => i[0]);
    const currentDate = new Date();
    const formatCurrentDate = currentDate && format(currentDate, "MMM d, y");

    return (
      <PageContainer>
        <GraphDisplay topCoin={topCoin} />
        {!list ? (
          <div>Loading</div>
        ) : (
          <TableDisplay
            string={string}
            sorted={sorted}
            top={top}
            descending={descending}
            handleFetchDataChange={this.props.handleFetchDataChange}
            handleTopToggle={this.handleTopToggle}
            handleDisplayOrderChange={this.handleDisplayOrderChange}
            handleDescendingToggle={this.handleDescendingToggle}
            pageNumber={this.props.fetchData.page}
            loading={loading}
          />
        )}
      </PageContainer>
    );
  }
}

export default CoinsPage;
