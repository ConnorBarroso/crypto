import React from "react";
import { Container, Symbol, StyledSelect } from "./CurrencyDropdown.Styles";

const symbols = {
  usd: "$",
  cad: "$",
  eur: "€",
  gbp: "£",
};
const currencyArray = ["usd", "cad", "eur", "gbp"];

class CurrencyDropdown extends React.Component {
  state = {
    symbol: "$",
  };
  handleOnChange = (e) => {
    this.setState({ symbol: symbols[e.target.value] });
    this.props.handleCurrency(e.target.value);
  };
  render() {
    const { currency } = this.props;
    return (
      <Container>
        <Symbol>{this.state.symbol}</Symbol>
        <StyledSelect onChange={this.handleOnChange} value={currency}>
          {currencyArray.map((i) => (
            <option value={i} key={Math.random()}>
              {i}
            </option>
          ))}
        </StyledSelect>
      </Container>
    );
  }
}
export default CurrencyDropdown;
