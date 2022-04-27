import {
  Container,
  Bar,
  Filled,
  LabelContainer,
  ColorLabel,
  Label,
  LabelText,
} from "./ProgressBar.styles";

const ProgressBar = ({
  numerator = 0,
  denominator = 0,
  percentage,
  mainColor,
  offColor,
}) => {
  const abbreviate = (number) => {
    if (number === null) {
      return "∞";
    }
    if (number === 0) {
      return "0";
    }
    const abbreviated = Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
    return abbreviated;
  };

  return (
    <Container>
      <LabelContainer>
        <Label>
          <ColorLabel color={mainColor} />
          <LabelText color={mainColor}>{abbreviate(numerator)}</LabelText>
        </Label>
        <Label>
          <ColorLabel color={offColor} />
          <LabelText color={offColor}>{abbreviate(denominator)}</LabelText>
        </Label>
      </LabelContainer>
      <Bar color={offColor}>
        <Filled percentage={percentage} color={mainColor}></Filled>
      </Bar>
    </Container>
  );
};

export default ProgressBar;
