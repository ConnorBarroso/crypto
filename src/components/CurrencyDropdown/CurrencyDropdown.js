import React from "react";
import { Container, Symbol, StyledSelect } from "./CurrencyDropdown.Styles";

class CurrencyDropdown extends React.Component {
  state = {
    symbol: "$",
  };
  handleOnChange = (e) => {
    const symbols = {
      usd: "$",
      cad: "$",
      eur: "€",
      gbp: "£",
    };
    this.setState({ symbol: symbols[e.target.value] });
    this.props.handleCurrency(e.target.value);
  };
  render() {
    const { currency } = this.props;
    const currencyArray = ["usd", "cad", "eur", "gbp"];

    return (
      <Container>
        <Symbol>{this.state.symbol}</Symbol>
        <StyledSelect onChange={this.handleOnChange} value={currency}>
          {currencyArray.map((i) => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </StyledSelect>
      </Container>
    );
  }
}
export default CurrencyDropdown;
