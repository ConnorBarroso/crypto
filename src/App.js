import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { CoinsPage, CoinPage, Portfolio } from "pages";
import { HeaderInfo, NavBar } from "components";
import { StyledHeader, PageWrapper } from "./App.styles";

class App extends React.Component {
  state = {
    toggle: false,
    fetchData: {
      currency: { string: "usd", symbol: "$" },
      sortBy: "market_cap",
      order: "desc",
      page: 1,
      days: 90,
      id: "bitcoin",
    },
    portfolio: [],
  };

  componentDidMount() {
    const localCurrency = JSON.parse(localStorage.getItem("currency"));
    const localSortBy = localStorage.getItem("sortBy");
    const localOrder = localStorage.getItem("order");
    localCurrency &&
      this.setState((prevState) => ({
        fetchData: {
          ...prevState.fetchData,
          sortBy: localSortBy,
          currency: localCurrency,
          order: localOrder,
        },
      }));
  }

  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  handleFetchDataChange = (type, value) => {
    if (value === this.state.fetchData[type]) return;
    this.setState((prevState) => ({
      toggle: false,
      fetchData: { ...prevState.fetchData, [type]: value },
    }));
    if (type === "currency") {
      localStorage.setItem(type, JSON.stringify(value));
      return;
    }
    localStorage.setItem(type, value);
  };

  render() {
    const { toggle, fetchData } = this.state;
    const { currency } = fetchData;
    return (
      <Router>
        <Redirect to="/coins" />
        <StyledHeader>
          <NavBar
            toggle={toggle}
            currency={currency}
            handleToggle={this.handleToggle}
            handleFetchDataChange={this.handleFetchDataChange}
            toggleTheme={this.props.toggleTheme}
          />
          <HeaderInfo />
        </StyledHeader>
        <PageWrapper>
          <Switch>
            <Route
              exact
              path={"/coins"}
              render={() => (
                <CoinsPage
                  fetchData={this.state.fetchData}
                  handleFetchDataChange={this.handleFetchDataChange}
                />
              )}
            />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/coins/:coinId/" component={CoinPage} />
          </Switch>
        </PageWrapper>
      </Router>
    );
  }
}

export default App;
