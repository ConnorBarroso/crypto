import axios from 'axios'

export const get = async (type, data={}) =>{

    const urls = {
        market: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${data.currency}&order=${data.sortBy}_${data.order}&per_page=10&page=${data.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
        coin: `https://api.coingecko.com/api/v3/coins/${data.id}`,
        coinHistory:`https://api.coingecko.com/api/v3/${data.id}/history`,
        coinMarket:  `https://api.coingecko.com/api/v3/${data.id}/market_chart`,
        global:  'https://api.coingecko.com/api/v3/global'
    }

  try{
      const response = await axios.get(urls[type])
      return response.data
    } catch(error){
        console.error(error)
    }

}