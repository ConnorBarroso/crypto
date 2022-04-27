import React from "react";
import { Carousel } from "components";

class GraphDisplay extends React.Component {
  render() {
    const { fetchData, topCoin, symbol } = this.props;
    return (
      <div>
        {/* <Carousel>
            <LineGraph
              fetchData={fetchData}
              topCoin={topCoin}
              symbol={symbol}
            />
            <GraphContainer>
              <GraphLabelContainer>
                <LabelVolume>Volume 24h</LabelVolume>
                <LabelValue>
                  {symbol}
                  {volumeSparkline[volumeSparkline.length - 1]}
                </LabelValue> 
                <LabelDate>{formatCurrentDate}</LabelDate>
              </GraphLabelContainer>

              <BarGraph dates={volumeDates} sparkline={volumeSparkline} />
            </GraphContainer>
          </Carousel> */}
        {/* <DesktopGraphContainer> */}
        {/* <LineGraph
            fetchData={this.props.fetchData}
            topCoin={topCoin}
            symbol={symbol}
          /> */}

        {/* <GraphContainer>
            <GraphLabelContainer>
              <LabelVolume>Volume 24h</LabelVolume>
              <LabelValue>
                {symbol}
                {volumeSparkline[volumeSparkline.length - 1]}
              </LabelValue>
              <LabelDate>{formatCurrentDate}</LabelDate>
            </GraphLabelContainer>

            <BarGraph dates={volumeDates} sparkline={volumeSparkline} />
          </GraphContainer> */}
        {/* </DesktopGraphContainer> */}
      </div>
    );
  }
}

export default GraphDisplay;
