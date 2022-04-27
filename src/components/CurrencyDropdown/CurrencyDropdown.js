import React from "react";
import { Container, Symbol, StyledSelect } from "./CurrencyDropdown.Styles";
class CurrencyDropdown extends React.Component {
  state = {
    symbol: "$",
  };
  render() {
    const { currency, handleCurrency } = this.props;
    const currencyArray = ["usd", "cad", "eur", "gbp"];
    const handleOnChange = (e) => {
      const symbols = {
        usd: "$",
        cad: "$",
        eur: "€",
        gbp: "£",
      };
      this.setState({ symbol: symbols[e.target.value] });
      handleCurrency(e.target.value);
    };
    return (
      <Container>
        <Symbol>{this.state.symbol}</Symbol>
        <StyledSelect onChange={handleOnChange} value={currency}>
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
