import styled from "styled-components";
import { Chart } from "react-chartjs-2";
export const StyledBar = styled(Chart)`
  margin: 70px 0 10px;
`;
export const GraphContainer = styled.div`
  margin: auto;
  max-width: 800px;
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
