import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 0 0 10px 10px;
  width: 60%;

  padding: 10px 0;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    border-radius: 0px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.off};
  }
`;

export const StyledList = styled.ul`
  all: unset;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const StyledItem = styled.li`
  all: unset;
  color: ${({ theme }) => theme.colors.text};
`;
