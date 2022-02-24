import { Link } from 'react-router-dom'

const ListedCoin = (props) =>{
    const { id, name, image, current_price, price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, circulating_supply, total_supply, market_cap, total_volume  } = props.data
    const rounding = props.rounding
    const hourChange = rounding(price_change_percentage_1h_in_currency)
    const dayChange = rounding(price_change_percentage_24h_in_currency)
    const weekChange = rounding(price_change_percentage_7d_in_currency)
    const supplyPercentage = rounding((circulating_supply / total_supply )*100) 
    const marketCapPercentage =rounding((total_volume / market_cap )*100)  

    return(
    <div>
        <Link to={`/coin/${id}`}>{name}</Link>
        <img src={image} alt='coin-logo'/>
        <div>Current price: {current_price}</div>
        <div>change 1 hour: {hourChange}%</div>
        <div>change 1 day: {dayChange}%</div>
        <div>change 7 days: {weekChange}%</div>
        <div>Supply: { supplyPercentage}% </div>
        <div>24h volume / market cap: {marketCapPercentage}% </div>
    </div>
)
}

export default ListedCoin
