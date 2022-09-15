import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DesktopGraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  @media (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    display: none;
  }
`;

export const MobileGraphContainer = styled.div`
  width: 90vw;
  display: none;
  @media (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    display: flex;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 15px;
  background-color: ${({ theme }) => theme.colors.main};
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
  justify-content: space-around;
`;

export const DayButton = styled.button`
  font-size: 16px;
  background-color: ${({ active, theme }) =>
    active ? "#2172E5" : theme.colors.off};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  border: none;
  margin: 0 5px;
  padding: 2px 5px;
  cursor: pointer;
  border-radius: 5px;
`;
