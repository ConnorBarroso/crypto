import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.off};
`;
export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    margin-bottom: 75px;
  }
`;
