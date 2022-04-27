import React from "react";
import CurrencyDropdown from "components/CurrencyDropdown";
import { withRouter } from "react-router-dom";
import {
  Container,
  Padding,
  LinkContainer,
  SearchContainer,
  StyledNavLink,
  StyledInput,
  StyledThemeIcon,
  StyledSearchIcon,
  MobileTitle,
} from "./NavBar.styles";
import MobileNavBar from "components/MobileNavBar";

const NavBar = (props) => {
  const { currency, handleCurrency, toggleTheme } = props;

  const pathnameArray = props.location.pathname.split("/");
  const title = pathnameArray[pathnameArray.length - 1];
  return (
    <Padding>
      <Container>
        <LinkContainer>
          <StyledNavLink exact activeClassName="any" to="/coins">
            Coins
          </StyledNavLink>
          <StyledNavLink activeClassName="any" to="/portfolio">
            Portfolio
          </StyledNavLink>
        </LinkContainer>
        <MobileTitle>{title}</MobileTitle>

        <SearchContainer>
          <StyledSearchIcon />
          <StyledInput placeholder="Search..." />
          <CurrencyDropdown
            currency={currency}
            handleCurrency={handleCurrency}
          />
          <StyledThemeIcon onClick={toggleTheme} />
        </SearchContainer>
      </Container>
      <MobileNavBar />
    </Padding>
  );
};

export default withRouter(NavBar);
