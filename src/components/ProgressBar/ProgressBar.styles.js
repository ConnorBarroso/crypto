import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 30px;
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
  }
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorLabel = styled.div`
  background-color: ${({ color }) => color};
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 0 4px;
`;

export const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ color }) => color};
  border-radius: 10px;
  overflow: hidden;
`;

const fillPercentage = css`
  ${({ percentage }) => `${percentage}%`};
`;
export const Filled = styled.div`
  width: ${fillPercentage};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 10px;
`;

export const LabelText = styled.p`
  all: unset;
  color: ${({ color }) => color} !important;
  font-size: 14px;
`;
