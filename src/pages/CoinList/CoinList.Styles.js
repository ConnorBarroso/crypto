import { Children } from "react/cjs/react.development";
import styled from "styled-components";
const transparency = 95;
export const GraphContainer = styled.div`
  margin: auto;
  max-width: 600px;
  position: relative;
`;

export const GraphLabelContainer = styled.div`
  position: absolute;
  left: 11px;
  background-color: ${({ theme }) => theme.colors.off}${transparency};
  box-shadow: 10px 10px 8px ${({ theme }) => theme.colors.off}${transparency};
`;

export const LabelSymbol = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 11px;
  font-weight: medium;
  text-transform: uppercase;
`;
export const LabelVolume = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 11px;
  font-weight: medium;
`;

export const LabelValue = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 21px;
  font-weight: 600;
`;
export const LabelDate = styled.p`
  color: lightgray;
  margin: 0;
  font-size: 11px;
  font-weight: medium;
`;
