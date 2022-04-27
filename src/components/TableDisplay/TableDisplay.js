import React, { useRef, useEffect, useCallback } from "react";
import { colors } from "./utils";
import {
  TableContainer,
  HeadingContainer,
  TableName,
  TableRank,
  TablePrice,
  TableHour,
  TableDay,
  TableWeek,
  TableMarketCap,
  TableSupply,
  TableGraphContainer,
} from "./TableDisplay.styles";

import { ListedCoin } from "components";

const TableDisplay = (props) => {
  const {
    string,
    sorted,
    top,
    descending,
    handleFetchDataChange,
    handleTopToggle,
    handleDisplayOrderChange,
    handleDescendingToggle,
    pageNumber,
    loading,
  } = props;

  let direction;
  if (!top) {
    direction = "desc";
  } else {
    direction = "asc";
  }
  const observer = useRef();

  const lastCoinElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleFetchDataChange("page", pageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  });

  const sortedWithColors = sorted.map((coinData, i) => {
    const colorCombo = colors[i % colors.length];
    const newCoinData = {
      ...coinData,
      mainColor: colorCombo.main,
      offColor: colorCombo.off,
    };
    return newCoinData;
  });

  return (
    <TableContainer>
      {loading && <div>Loading...</div>}
      <div>
        <button onClick={() => handleFetchDataChange("sortBy", "market_cap")}>
          Sort by market cap
        </button>
        <button onClick={() => handleFetchDataChange("sortBy", "volume")}>
          Sort by volume
        </button>
        <button onClick={() => handleTopToggle(direction)}>
          {top ? `Top ${sorted.length}` : `Bottom ${sorted.length}`}
        </button>
      </div>
      <div>
        <button onClick={handleDescendingToggle}>
          {descending ? "Descending" : "Ascending"}
        </button>
      </div>
      <HeadingContainer>
        <TableRank>
          <p>#</p>
        </TableRank>
        <TableName>
          <p>Name</p>
        </TableName>
        <TablePrice
          isHeading={true}
          onClick={() => handleDisplayOrderChange("current_price")}
        >
          <p>Price</p>
        </TablePrice>
        <TableHour
          isHeading={true}
          onClick={() =>
            handleDisplayOrderChange("price_change_percentage_1h_in_currency")
          }
        >
          <p>1hr%</p>
        </TableHour>
        <TableDay
          isHeading={true}
          onClick={() =>
            handleDisplayOrderChange("price_change_percentage_24h_in_currency")
          }
        >
          <p>24h%</p>
        </TableDay>
        <TableWeek
          isHeading={true}
          onClick={() =>
            handleDisplayOrderChange("price_change_percentage_7d_in_currency")
          }
        >
          <p>7d%</p>
        </TableWeek>
        <TableMarketCap>
          <p>24h Volume/Market Cap</p>
        </TableMarketCap>
        <TableSupply>
          <p>Circulating/Total Supply</p>
        </TableSupply>
        <TableGraphContainer>
          <p>Last 7 days</p>
        </TableGraphContainer>
      </HeadingContainer>
      {sortedWithColors?.map((coin, i) => {
        if (sortedWithColors.length === i + 1) {
          return (
            <div ref={lastCoinElementRef} key={coin.id}>
              <ListedCoin string={string} data={coin} index={i} />
            </div>
          );
        } else {
          return (
            <ListedCoin key={coin.id} string={string} data={coin} index={i} />
          );
        }
      })}
      {loading && <div>Loading....</div>}
    </TableContainer>
  );
};

export default TableDisplay;
