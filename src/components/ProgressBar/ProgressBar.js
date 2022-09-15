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
  compact = false,
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
      {!compact && (
        <LabelContainer>
          <Label>
            <ColorLabel style={{ backgroundColor: mainColor }} />
            <LabelText style={{ color: mainColor }}>
              {abbreviate(numerator)}
            </LabelText>
          </Label>
          <Label>
            <ColorLabel style={{ backgroundColor: offColor }} />
            <LabelText style={{ color: mainColor }}>
              {abbreviate(denominator)}
            </LabelText>
          </Label>
        </LabelContainer>
      )}

      <Bar style={{ backgroundColor: offColor }}>
        <Filled
          percentage={percentage}
          style={{ backgroundColor: mainColor }}
        ></Filled>
      </Bar>
    </Container>
  );
};

export default ProgressBar;
