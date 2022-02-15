import React from 'react'
import { ListedCoin } from 'components'
import { get } from 'utils'

class CoinList extends React.Component{
    state = {
        list:[]
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

    render(){
        
        
        
        return(
            <div>
                {
                    this.state.list?.map( i=>
                        <ListedCoin 
                            key={i.id} 
                            data={i}
                        />
                    )
                    
                }
            </div>
        )
    }
}

export default CoinList