import react from "react";
import { Container, Symbol, StyledSelect } from "./CurrencyDropdown.Styles";
const CurrencyDropdown = (props) => {
  const { currency, handleFetchDataChange } = props;
  const currencyArray = ["usd", "cad", "eur", "gbp"];
  const handleOnChange = (e) => {
    const symbols = {
      usd: "$",
      cad: "$",
      eur: "€",
      gbp: "£",
    };
    const currencyObject = {
      string: e.target.value,
      symbol: symbols[e.target.value],
    };
    handleFetchDataChange("currency", currencyObject);
  };
  return (
    <Container>
      <Symbol>{currency.symbol}</Symbol>
      <StyledSelect onChange={handleOnChange} value={currency.string}>
        {currencyArray.map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};
export default CurrencyDropdown;
