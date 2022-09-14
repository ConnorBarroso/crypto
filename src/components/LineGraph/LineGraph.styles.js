import styled from "styled-components";
import { Chart } from "react-chartjs-2";

export const StyledLine = styled(Chart)`
  margin: 70px 0 10px;
  height: 100%;
  width: 100%;
`;

export const GraphContainer = styled.div`
  margin: auto;
  width: 45%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 10px;
  padding: 5px 15px 5px 10px;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    padding: 0;
    max-width: 600px;
    background-color: ${({ theme }) => theme.colors.off};
  }
`;

export const GraphLabelContainer = styled.div`
  position: absolute;
  left: 11px;
  background-color: ${({ theme }) => theme.colors.main}95;
  box-shadow: 10px 10px 8px ${({ theme }) => theme.colors.main}95;
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    background-color: ${({ theme }) => theme.colors.off}95;
    box-shadow: 10px 10px 8px ${({ theme }) => theme.colors.off}95;
  }
  color: ${({ theme }) => theme.colors.text};
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
