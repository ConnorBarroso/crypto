import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { CoinList, CoinPage, Portfolio } from "pages";
import { HeaderInfo, NavBar } from "components";
import "./App.css";
import styled from "styled-components";
const PageWrapper = styled.div`
  margin-bottom: 75px;
`;

class App extends React.Component {
  state = {
    toggle: false,
    fetchData: {
      currency: "usd",
      sortBy: "market_cap",
      order: "desc",
      page: 1,
      days: 90,
      id: "bitcoin",
    },
    portfolio: [],
  };

  componentDidMount() {
    const localCurrency = localStorage.getItem("currency");
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
    localStorage.setItem(type, value);
  };

  render() {
    const { toggle, fetchData } = this.state;
    const { currency } = fetchData;
    return (
      <Router>
        <Redirect to="/coins" />
        <NavBar
          toggle={toggle}
          currency={currency}
          handleToggle={this.handleToggle}
          handleFetchDataChange={this.handleFetchDataChange}
          toggleTheme={this.props.toggleTheme}
        />
        <HeaderInfo />
        <PageWrapper>
          <Switch>
            <Route
              exact
              path={"/coins"}
              render={() => (
                <CoinList
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
