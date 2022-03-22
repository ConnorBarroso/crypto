import react from "react";
import { Container, Symbol, StyledSelect } from "./CurrencyDropdown.Styles";
const CurrencyDropdown = (props) => {
  const { currency, handleFetchDataChange } = props;
  const currencyArray = ["usd", "cad", "eur", "gbp"];
  const handleOnChange = (e) => {
    handleFetchDataChange("currency", e.target.value);
  };
  return (
    <Container>
      <Symbol>$</Symbol>
      <StyledSelect onChange={handleOnChange} value={currency}>
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
