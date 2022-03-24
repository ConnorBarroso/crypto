import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MobileNavContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: flex;
  }
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.off};
  height: 75px;
  align-items: center;
  justify-content: space-around;
  z-index: 20;
`;

export const StyledLinkContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const StyledLabel = styled.p`
  margin: 0px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 3px;
`;

export const StyledLink = styled(NavLink)`
  display: none;
  height: 28px;
  width: 28px;
  cursor: pointer;
  & path {
    fill: ${({ theme }) => theme.colors.text};
  }

  &.${(props) => props.activeClassName} {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
  color: ${({ theme }) => theme.colors.text};
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;
