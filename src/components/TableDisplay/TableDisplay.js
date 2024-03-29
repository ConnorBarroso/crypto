import React from "react";
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
  ListContainer,
} from "./TableDisplay.styles";

import CoinList from "components/CoinList";

class TableDisplay extends React.Component {
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
    loading: false,
    sortLocal: false,
    error: false,
  };
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

  handleGet = async () => {
    const listData = await getCoinList(this.state?.fetchData);
    if (listData instanceof Error === true) {
      this.setState({ error: true, loading: false });
      return;
    }
    const coloredList = this.addColors(listData);
    this.setState({ list: coloredList, loading: false });
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
    this.handleGet(this.state.fetchData);
  }
  async componentDidUpdate(prevProps, prevState) {
    const { fetchData } = this.state;
    const currency = this.props.currency;
    const { apiOrder, sortBy, page } = fetchData;
    const prevFetchData = prevState.fetchData;
    const prevApiOrder = prevFetchData.apiOrder;
    const prevSortBy = prevFetchData.sortBy;
    const prevPage = prevFetchData.page;
    const prevList = prevState.list;

    if (prevProps.currency !== currency) {
      this.setState({
        fetchData: { ...prevState.fetchData, currency: currency },
      });

      this.handleGet(fetchData);
    }

    if (prevApiOrder !== apiOrder || prevSortBy !== sortBy) {
      this.handleGet(fetchData);
    }

    if (prevPage !== page) {
      const listData = await getCoinList(fetchData);
      if (listData instanceof Error === true) {
        this.setState({ error: true, loading: false });
        return;
      }
      const fullList = prevList.concat(this.addColors(listData));
      this.setState({ list: fullList });
    }
  }

  handleFetchData = (key, value) => {
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
    this.setState({ sortingProp: sortingProp, sortLocal: true });
  };

  handleSortingOrder = () => {
    if (this.state.sortingOrder === "desc") {
      this.setState({ sortingOrder: "asc", sortLocal: true });
    } else {
      this.setState({ sortingOrder: "desc", sortLocal: true });
    }
  };

  handleNext = () => {
    this.setState((prevState) => ({
      fetchData: {
        ...prevState.fetchData,
        page: prevState.fetchData.page + 1,
      },
    }));
  };

  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  };

  render() {
    const { fetchData, sortingProp, loading, sortingOrder, error, sortLocal } =
      this.state;
    const { apiOrder } = fetchData;
    const { currency } = this.props;

    const coinList = [...this.state.list];

    let displayedList = coinList;

    if (sortLocal) {
      displayedList = coinList?.sort((a, b) => {
        if (sortingOrder === "asc") {
          return a[sortingProp] - b[sortingProp];
        }
        return b[sortingProp] - a[sortingProp];
      });
    }
    return (
      <TableContainer>
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
        <ListContainer>
          {!loading && !error ? (
            <CoinList
              list={displayedList}
              currency={currency}
              isRowLoaded={this.isRowLoaded}
              handleNext={this.handleNext}
            />
          ) : error ? (
            <>
              <h1 style={{ color: "red" }}> SOMETHING'S GONE WRONG!</h1>
              <button onClick={this.handleGet}>retry</button>
            </>
          ) : (
            <ReactLoading type={"spin"} />
          )}
        </ListContainer>
      </TableContainer>
    );
  }
}

export default TableDisplay;
