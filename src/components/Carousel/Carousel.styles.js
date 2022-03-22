import { ReactComponent as NextArrowIcon } from "../../resources/next-arrow.svg";
import { ReactComponent as PrevArrowIcon } from "../../resources/prev-arrow.svg";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 300px;
  max-width: 100vw;
`;

export const StyledNextArrow = styled(NextArrowIcon)`
  height: 20px;
  width: 20px;
  path {
    fill: ${({ theme }) => theme.colors.text};
  }
`;
export const StyledPrevArrow = styled(PrevArrowIcon)`
  height: 20px;
  width: 20px;
  path {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  justify-content: center;

  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    width: 80%;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    border-radius: 10px;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.off};
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: "";
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
    width: 600px;
  }
  [dir="rtl"] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: flex;
    justify-content: center;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-arrow {
    position: absolute;
    cursor: pointer;
    top: 20px;
  }
  .slick-next {
    right: 20px;
  }

  .slick-prev {
    z-index: 10;
    right: 70px;
  }
`;
