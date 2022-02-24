import React from 'react'
import { ListedCoin } from 'components'
import { get } from 'utils'

class CoinList extends React.Component{
    state = {
        list:[],
        top: true,
        displayOrder: 'current_price',
        descending: true
    }

    handleGet = async (fetchData) =>{
       const coinList = await  get('market', fetchData)
       this.setState({ list: coinList }) 
    }

    componentDidMount(){
        this.handleGet(this.props.fetchData)
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.fetchData !== this.props.fetchData){
            this.handleGet(this.props.fetchData)
        }
    }

    handleTopToggle = (direction) =>{
        this.setState({ top: !this.state.top })
        this.props.handleFetchDataChange('order', direction)
    }

    handleDisplayOrderChange = (display) =>{
        this.setState({displayOrder: display})
    }

    handleDescendingToggle = () =>{
        this.setState({descending: !this.state.descending})
    }

    handleRounding = (number) =>{
        return Math.round((number + Number.EPSILON)*100)/ 100
    }


    render(){
        const { list, top, descending, displayOrder } = this.state

        let direction 
        if(!top){
            direction = 'desc'
        }else{
            direction = 'asc'
        }

        const coinList = list

        const sorted = coinList.sort((a, b) =>{
            if(!descending){
                return a[displayOrder] - b[displayOrder]
            }
            return b[displayOrder] - a[displayOrder]
        })

        return(
            <div>
                <div>
                    <div>
                    <button onClick={()=>this.props.handleFetchDataChange('sortBy', 'market_cap')}>Sort by market cap</button>
                    <button onClick={()=>this.props.handleFetchDataChange('sortBy', 'volume')}>Sort by volume</button>
                    <button onClick={()=>this.handleTopToggle(direction)}>{top ? ('Top 10') : ('Bottom 10')}</button>
                    </div>
                    <div>
                        <button onClick={this.handleDescendingToggle}>{descending ? ('Descending') : ('Ascending')}</button>
                        <button onClick = {() => this.handleDisplayOrderChange('current_price')}>Highest Price</button>
                        <button onClick = {() => this.handleDisplayOrderChange('price_change_percentage_1h_in_currency')}>% change 1 hour</button>
                        <button onClick = {() => this.handleDisplayOrderChange('price_change_percentage_24h_in_currency')}>% change 1 day</button>
                        <button onClick = {() => this.handleDisplayOrderChange('price_change_percentage_7d_in_currency')}>% change 7 days</button>   
                    </div>
                    {
                        sorted?.map( i=>
                            <ListedCoin 
                                key={i.id} 
                                data={i}
                                rounding = {this.handleRounding}
                            />
                        )
                    
                    }  
                </div>
                
            </div>
        )
    }
}

export default CoinList