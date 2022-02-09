import { Link } from 'react-router-dom'

const ListedCoin = ({data}) =>{
    const { id, name, image, current_price } = data
    return(
    <div>
        <Link to={`/coin/${id}`}>{name}</Link>
        <img src={image} alt='coin-logo'/>
        <div>Current price: {current_price}</div>
    </div>
)
}

export default ListedCoin
