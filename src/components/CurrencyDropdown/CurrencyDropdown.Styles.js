import { isContentEditable } from "@testing-library/user-event/dist/utils";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.off};
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 2px 9px 10px;
  margin-left: 10px;
  height: 28px;
  &:after {
    position: absolute;
    content: "▼";
    right: 8px;
    color: ${({ theme }) => theme.colors.highlight};
    font-size: 0.8rem;
  }
`;

export const Symbol = styled.div`
  display: flex;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: black;
  color: #00ff5f;
  align-items: center;
  justify-content: center;
  margin: 0 8px 0 0;
  font-weight: 400;
  @media (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    display: none;
  }
`;

export const StyledSelect = styled.select`
  &:after {
    content: "a";
  }
  background-color: transparent;
  border-style: none;
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  font-size: 1rem;
  font-weight: 400;
  width: 58px;
  text-transform: uppercase;
  overflow: visible;
  outline: none;

  option {
    background-color: ${({ theme }) => theme.colors.off};
    text-transform: uppercase;
  }
`;
