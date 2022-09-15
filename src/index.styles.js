import { createGlobalStyle } from "styled-components";

export const Body = createGlobalStyle`
    body{
        background-color: ${({ theme }) => theme.colors.off};
        @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
        background-color: ${({ theme }) => theme.colors.main};
  }
    }
    
`;
