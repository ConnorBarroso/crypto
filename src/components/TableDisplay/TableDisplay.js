import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import { getCoinList } from "utils";
import { colors } from "./utils";
import {
  TableContainer,
  HeadingContainer,
  TableName,
  TableRank,
  TablePrice,
  TableHour,
  TableDay,
  TableWeek,
  TableMarketCap,
  TableSupply,
  TableGraphContainer,
} from "./TableDisplay.styles";

import { ListedCoin } from "components";

class TableDisplay extends React.Component {
  //renamed order to apiOrder and set sortingOrder to use the same values as apiOrder
  state = {
    fetchData: {
      sortBy: "market_cap",
      apiOrder: "desc",
      page: 1,
      currency: "usd",
    },
    sortingProp: "current_price",
    sortingOrder: "desc",
    list: [],
    loading: true,
    sortLocal: false,
  };
  //moved and renamed sortedWithColors function here.
  addColors = (array) => {
    const coloredList = array?.map((coinData, i) => {
      const colorCombo = colors[i % colors.length];
      const newCoinData = {
        ...coinData,
        mainColor: colorCombo.main,
        offColor: colorCombo.off,
      };
      return newCoinData;
    });
    return coloredList;
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const localSortBy = localStorage.getItem("sortBy");
    const localOrder = localStorage.getItem("order");

    this.setState((prevState) => ({
      fetchData: {
        ...prevState.fetchData,
        sortBy: localSortBy,
        apiOrder: localOrder,
        currency: this.props.currency,
      },
    }));
    const listData = await getCoinList(this.state.fetchData);
    //using addColors function
    const coloredList = this.addColors(listData);
    this.setState({ list: coloredList, loading: false });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        fetchData: { ...prevState.fetchData, currency: this.props.currency },
      });
    }
    if (
      prevState.fetchData.apiOrder !== this.state.fetchData.apiOrder ||
      prevState.fetchData.sortBy !== this.state.fetchData.sortBy
    ) {
      const listData = await getCoinList(this.state.fetchData);
      const coloredList = this.addColors(listData);
      this.setState({ list: coloredList });
    }
  }

  handleFetchData = (key, value) => {
    //set sortLocal to false even if the fetchData is the same, so the user can easily reset it back to the API list
    this.setState({ sortLocal: false });

    if (this.state.fetchData[key] === value) return;
    localStorage.setItem(key, value);
    this.setState((prevState) => ({
      fetchData: {
        ...prevState.fetchData,
        [key]: value,
      },

      loading: true,
    }));
  };

  handleSortingProp = (sortingProp) => {
    //setting sortLocal in my local sorting functions
    this.setState({ sortingProp: sortingProp, sortLocal: true });
  };

  handleSortingOrder = () => {
    if (this.state.sortingOrder === "desc") {
      this.setState({ sortingOrder: "asc", sortLocal: true });
    } else {
      this.setState({ sortingOrder: "desc", sortLocal: true });
    }
  };

  handleNext = async () => {
    this.setState((prevState) => ({
      fetchData: {
        ...prevState.fetchData,
        page: this.state.fetchData.page + 1,
      },
    }));

    const newData = await getCoinList(this.state.fetchData);

    const newList = [...this.state.list, ...this.addColors(newData)];
    this.setState({ list: newList, sortLocal: false });
  };

  render() {
    const { fetchData, sortingProp, loading, sortingOrder } = this.state;
    const { apiOrder, page } = fetchData;
    const { currency } = this.props;

    const coinList = [...this.state.list];

    //set the value of displayedList to be either the sorted array or the state array based off the sortLocal state
    let displayedList;
    if (this.state.sortLocal) {
      displayedList = coinList?.sort((a, b) => {
        if (sortingOrder === "asc") {
          return a[sortingProp] - b[sortingProp];
        }
        return b[sortingProp] - a[sortingProp];
      });
    } else {
      displayedList = coinList;
    }

    return (
      <TableContainer>
        {loading && <ReactLoading type={"spinningBubbles"} />}
        <div>
          <button onClick={() => this.handleFetchData("sortBy", "market_cap")}>
            Sort by market cap
          </button>
          <button onClick={() => this.handleFetchData("sortBy", "volume")}>
            Sort by volume
          </button>
          <button
            onClick={() => {
              apiOrder === "desc"
                ? this.handleFetchData("apiOrder", "asc")
                : this.handleFetchData("apiOrder", "desc");
            }}
          >
            {apiOrder === "desc"
              ? `Top ${this.state?.list?.length}`
              : `Bottom ${this.state?.list?.length}`}
          </button>
        </div>
        <div>
          <button onClick={this.handleSortingOrder}>
            {sortingOrder === "desc" ? "Descending" : "Ascending"}
          </button>
        </div>
        <HeadingContainer>
          <TableRank>
            <p>#</p>
          </TableRank>
          <TableName>
            <p>Name</p>
          </TableName>
          <TablePrice
            isHeading={true}
            onClick={() => this.handleSortingProp("current_price")}
          >
            <p>Price</p>
          </TablePrice>
          <TableHour
            isHeading={true}
            onClick={() =>
              this.handleSortingProp("price_change_percentage_1h_in_currency")
            }
          >
            <p>1hr%</p>
          </TableHour>
          <TableDay
            isHeading={true}
            onClick={() =>
              this.handleSortingProp("price_change_percentage_24h_in_currency")
            }
          >
            <p>24h%</p>
          </TableDay>
          <TableWeek
            isHeading={true}
            onClick={() =>
              this.handleSortingProp("price_change_percentage_7d_in_currency")
            }
          >
            <p>7d%</p>
          </TableWeek>
          <TableMarketCap>
            <p>24h Volume/Market Cap</p>
          </TableMarketCap>
          <TableSupply>
            <p>Circulating/Total Supply</p>
          </TableSupply>
          <TableGraphContainer>
            <p>Last 7 days</p>
          </TableGraphContainer>
        </HeadingContainer>
        <InfiniteScroll
          dataLength={this.state.list?.length}
          next={this.handleNext}
          hasMore={true}
          style={{
            width: "100%",
            boxSizing: "border-box",
            overflowY: "hidden",
          }}
        >
          {displayedList?.map((coin, i) => (
            <ListedCoin
              key={coin.id}
              currency={currency}
              data={coin}
              index={i}
            />
          ))}
        </InfiniteScroll>
      </TableContainer>
    );
  }
}

export default TableDisplay;
