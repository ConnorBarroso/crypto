import axios from 'axios'

export const get = async (type, data) =>{
  let url 
  switch(type){
      default: return

      case 'market': url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${data.currency}&order=${data.order}_${data.sortBy}&per_page=20&page=${data.page}&sparkline=true`
      break;
      
      case 'coin': url = `https://api.coingecko.com/api/v3/coins/${data.id}`
      break;

      case 'coinHistory': url = `https://api.coingecko.com/api/v3/${data.id}/history`
      break;

      case 'coinMarket': url = `https://api.coingecko.com/api/v3/${data.id}/market_chart`
      break;
  }

  try{
      const response = await axios.get(url)
      return response.data
    } catch(error){
        console.error(error)
    }

}