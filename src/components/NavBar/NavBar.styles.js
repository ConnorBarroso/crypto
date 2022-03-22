import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as ThemeIcon } from "../../resources/dark.svg";
import { ReactComponent as SearchIcon } from "../../resources/search.svg";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 59px;
  width: 100%;
  background: ${({ theme }) => theme.colors.main};
  box-sizing: border-box;
`;

export const Padding = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  height: 47px;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const LinkContainer = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: none;
  }
`;
export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.colors.main};
  align-items: center;
  box-sizing: border-box;
`;

export const StyledNavLink = styled(NavLink)`
  background: ${({ theme }) => theme.colors.main};
  &.${(props) => props.activeClassName} {
    background: ${({ theme }) => theme.colors.off};
  }
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  text-decoration: none;
  width: 120px;
  height: 100%;
  padding: 10px 0;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: none;
  }
`;

export const StyledInput = styled.input`
  all: unset;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.off};
  border-radius: 10px;
  width: 294px;
  font-size: 1rem;
  box-sizing: border-box;
  height: 47px;
  @media (max-width: ${({ theme }) => theme.breakPoints.laptop}) {
    width: 194px;
  }
  padding: 14px 0 12px 56px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
  &:after {
    position: absolute;

    height: 24px;
    width: 24px;
  }
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: none;
  }
`;

export const StyledThemeIcon = styled(ThemeIcon)`
  width: 47px;
  height: 47px;
  margin-left: 20px;
  cursor: pointer;
  & path {
    fill: ${({ theme }) => theme.colors.text};
  }
  & rect {
    fill: ${({ theme }) => theme.colors.off};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 25px;
  height: 20px;
  width: 20px;
  & path {
    fill: ${({ theme }) => theme.colors.text};
  }
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: none;
  }
`;

export const MobileTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: none;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    display: block;
  }
  text-transform: capitalize;
`;
