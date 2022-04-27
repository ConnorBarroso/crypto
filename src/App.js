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
// look into redux persist
class App extends React.Component {
  state = {
    currency: "usd",
    portfolio: [],
  };

  componentDidMount() {
    const localCurrency = localStorage.getItem("currency");
    localCurrency && this.setState({ currency: localCurrency });
  }

  handleCurrency = (value) => {
    this.setState({ currency: value });
    localStorage.setItem("currency", value);
  };

  render() {
    const currency = this.state.currency;

    return (
      <Router>
        <Redirect to="/coins" />
        <StyledHeader>
          <NavBar
            currency={currency}
            handleCurrency={this.handleCurrency}
            toggleTheme={this.props.toggleTheme}
          />
          <HeaderInfo />
        </StyledHeader>
        <PageWrapper>
          <Switch>
            <Route
              exact
              path={"/coins"}
              render={() => <CoinsPage currency={currency} />}
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
