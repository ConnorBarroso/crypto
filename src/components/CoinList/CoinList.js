import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ListedCoin } from "components";
const CoinList = (props) => {
  const { list, currency, handleNext } = props;

  return (
    <div>
      <InfiniteScroll dataLength={list.length} next={handleNext} hasMore={true}>
        {list.map((coin, index) => (
          <ListedCoin
            key={coin.id}
            currency={currency}
            data={coin}
            index={index}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CoinList;
