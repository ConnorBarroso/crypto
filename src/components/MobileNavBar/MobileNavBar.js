import React from "react";
import { linkArray } from "./utils";
import {
  MobileNavContainer,
  StyledLinkContainer,
  StyledLabel,
  StyledLink,
} from "./MobileNavBar.styles";

const MobileNavBar = () => {
  return (
    <MobileNavContainer>
      {linkArray.map((link) => (
        <StyledLinkContainer key={link.to}>
          <StyledLink exact activeClassName="any" to={link.to}>
            {link.svg}
          </StyledLink>
          <StyledLabel>{link.label}</StyledLabel>
        </StyledLinkContainer>
      ))}
    </MobileNavContainer>
  );
};
export default MobileNavBar;
