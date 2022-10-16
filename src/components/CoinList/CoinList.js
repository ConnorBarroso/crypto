import React from "react";
import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

import { ListedCoin } from "components";
const CoinList = (props) => {
  const { list, currency, handleNext, isRowLoaded } = props;

  return (
    <AutoSizer disableHeight={true}>
      {({ width }) => (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <InfiniteLoader
              loadMoreRows={handleNext}
              isRowLoaded={isRowLoaded}
              rowCount={100}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  autoHeight
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={list?.length}
                  rowHeight={42}
                  rowRenderer={({ key, index, style }) => {
                    const coin = list[index];
                    return (
                      <ListedCoin
                        key={key}
                        currency={currency}
                        data={coin}
                        style={style}
                        index={index}
                      />
                    );
                  }}
                  scrollTop={scrollTop}
                  width={width}
                />
              )}
            </InfiniteLoader>
          )}
        </WindowScroller>
      )}
    </AutoSizer>
  );
};

export default CoinList;
