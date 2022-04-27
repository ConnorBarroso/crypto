import styled, { css } from "styled-components";
const arrow = { down: "▼", up: "▲" };

const before = css`
  ${({ isNegative, isHeading }) =>
    !isHeading && isNegative ? arrow.down : arrow.up}
`;

const variableText = css`
  p {
    color: ${({ isNegative, theme }) =>
      isNegative ? theme.colors.error : theme.colors.highlight};

    ${({ isHeading, theme }) => isHeading && `color:${theme.colors.text};`}

    &:before {
      content: "${before}";
      ${({ isHeading }) => isHeading && `content: none`}
    }
    ${({ isHeading }) => isHeading && `cursor: pointer;`}
  }
`;

export const TableContainer = styled.div`
  box-sizing: border-box;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 10px;
  width: 90vw;
  padding: 40px 30px;
  margin-bottom: 25px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 25px;
  p {
    all: unset;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }
`;

export const TableItems = styled.p`
  all: unset;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableRank = styled.span`
  flex: 0.5;
  min-width: 15px;
  overflow: hidden;
`;
export const TableName = styled.span`
  flex: 2;
  min-width: 150px;
  overflow: hidden;
`;
export const TablePrice = styled.span`
  flex: 1;
  min-width: 90px;
  overflow: hidden;
  text-align: center;
  ${({ isHeading }) => isHeading && `cursor: pointer;`}
`;
export const TableHour = styled.span`
  flex: 1;
  min-width: 15px;
  overflow: hidden;
  text-align: center;

  ${variableText}
`;
export const TableDay = styled.span`
  flex: 1;
  min-width: 15px;
  overflow: hidden;
  text-align: center;

  ${variableText}
`;
export const TableWeek = styled.span`
  flex: 1;
  min-width: 15px;
  text-align: center;
  overflow: hidden;
  ${variableText}
`;
export const TableMarketCap = styled.span`
  flex: 2;
  min-width: 20px;
  margin: 0 20px;
  text-align: center;
`;
export const TableSupply = styled.span`
  flex: 2;
  min-width: 20px;
  text-align: center;
`;

export const TableGraphContainer = styled.span`
  flex: 2;
  min-width: 150px;
  text-align: right;
  margin-left: 20px;
`;
