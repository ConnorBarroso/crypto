import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;

  text-align: left;
  border-bottom: 1px solid #707070;
  margin-bottom: 25px;
  padding-bottom: 5px;
  width: 100%;
  p {
    all: unset;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }
  :last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const StyledImg = styled.img`
  height: 30px;
  width: 30px;
`;

export const StyledLink = styled(Link)`
  all: unset;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 3px;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  width: 100%;
  font-size: 14px;
`;

export const StyledSymbol = styled.p`
  all: unset;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledNumber = styled.p`
  all: unset;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 35px;
`;

export const IdContainer = styled.div`
  display: flex;
  width: 275px;
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const DataItem = styled.p`
  all: unset;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.text};
`;
