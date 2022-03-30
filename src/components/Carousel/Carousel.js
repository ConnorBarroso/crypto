import React, { Component } from "react";
import Slider from "react-slick";

import {
  Container,
  StyledImage,
  SliderContainer,
  StyledNextArrow,
  StyledPrevArrow,
  SlickContainer,
} from "./Carousel.styles";
import { Children } from "react/cjs/react.production.min";

class DemoCarousel extends Component {
  render() {
    const NextArrow = (props) => {
      const { className, onClick } = props;
      return <StyledNextArrow className={className} onClick={onClick} />;
    };
    const PrevArrow = (props) => {
      const { className, onClick } = props;
      return <StyledPrevArrow className={className} onClick={onClick} />;
    };

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <SlickContainer>
        <SliderContainer>
          <Slider {...settings}>{this.props.children}</Slider>
        </SliderContainer>
      </SlickContainer>
    );
  }
}

export default DemoCarousel;
