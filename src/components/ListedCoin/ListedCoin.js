import { rounding } from "utils";
import {
  Container,
  StyledImg,
  StyledLink,
  StyledSymbol,
  IdContainer,
} from "./ListedCoin.styles";
import {
  TableName,
  TableRank,
  TablePrice,
  TableHour,
  TableDay,
  TableWeek,
  TableMarketCap,
  TableSupply,
  TableGraphContainer,
} from "../TableDisplay/TableDisplay.styles";
import { ProgressBar, TableGraph } from "components";

const ListedCoin = (props) => {
  const { index, currency } = props;
  const {
    id,
    symbol,
    name,
    image,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    circulating_supply,
    total_supply,
    market_cap,
    total_volume,
    mainColor,
    offColor,
    sparkline_in_7d,
  } = props.data;

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  });

  const price = formatter.format(rounding(current_price));

  const hourChange = `${rounding(price_change_percentage_1h_in_currency)}%`;
  const dayChange = `${rounding(price_change_percentage_24h_in_currency)}%`;
  const weekChange = `${rounding(price_change_percentage_7d_in_currency)}%`;
  const supplyPercentage =
    total_supply === null
      ? "∞"
      : rounding((circulating_supply / total_supply) * 100);
  const marketCapPercentage = market_cap
    ? rounding((total_volume / market_cap) * 100)
    : "∞";
  const negativeCheck = (numberString) => {
    if (numberString.includes("-")) {
      return numberString.substring(1);
    }
    return numberString;
  };
  return (
    <Container>
      <TableRank>
        <p>{index + 1}</p>
      </TableRank>
      <TableName>
        <IdContainer>
          <StyledImg src={image} alt="coin-logo" />
          <StyledLink to={`/coins/${id}`}>
            {name}
            <StyledSymbol>({symbol})</StyledSymbol>
          </StyledLink>
        </IdContainer>
      </TableName>

      <TablePrice>
        <p>{price}</p>
      </TablePrice>
      <TableHour isNegative={hourChange.includes("-")}>
        <p>{negativeCheck(hourChange)}</p>
      </TableHour>
      <TableDay isNegative={dayChange.includes("-")}>
        <p>{negativeCheck(dayChange)}</p>
      </TableDay>
      <TableWeek isNegative={weekChange.includes("-")}>
        <p>{negativeCheck(weekChange)}</p>
      </TableWeek>
      <TableMarketCap>
        <ProgressBar
          numerator={total_volume}
          denominator={market_cap}
          percentage={marketCapPercentage}
          mainColor={mainColor}
          offColor={offColor}
        />
      </TableMarketCap>
      <TableSupply>
        <ProgressBar
          numerator={circulating_supply}
          denominator={total_supply}
          percentage={supplyPercentage}
          mainColor={mainColor}
          offColor={offColor}
        />
      </TableSupply>
      <TableGraphContainer>
        <TableGraph
          sparkline={sparkline_in_7d}
          percentage={price_change_percentage_7d_in_currency}
        />
      </TableGraphContainer>
    </Container>
  );
};

export default ListedCoin;
