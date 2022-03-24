import { Children } from "react/cjs/react.development";
import styled from "styled-components";

export const GraphContainer = styled.div`
  margin: auto;
  max-width: 600px;
  position: relative;
`;

export const GraphLabelContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 13px;
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
