import axios from "axios";

export const get = async (type, data = {}) => {
  const urls = {
    market: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${data?.currency?.string}&order=${data.sortBy}_${data.order}&per_page=10&page=${data.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    coin: `https://api.coingecko.com/api/v3/coins/${data.id}`,
    coinHistory: `https://api.coingecko.com/api/v3/${data.id}/history`,
    coinMarket: `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=${data?.currency?.string}&days=${data.days}&interval=daily`,
    global: "https://api.coingecko.com/api/v3/global",
  };

  try {
    const { data } = await axios.get(urls[type]);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const rounding = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const getCoinList = async (fetchData) => {
  const coinList = await get("market", fetchData);
  return coinList;
};

export const getGraphData = async (fetchData) => {
  const graphData = await get("coinMarket", fetchData);
  return graphData;
};

export const getGlobal = async () => {
  const global = await get("global");
  return global;
};

export const getCoinData = async (fetchData) => {
  const coinData = await get("coin", fetchData);
  return coinData;
};

export const getCoinHistory = async (fetchData) => {
  const coinHistory = await get("coinHistory", fetchData);
  return coinHistory;
};
