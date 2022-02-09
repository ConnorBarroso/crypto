import React from 'react'
import { get } from 'utils'
import { ListedCoin } from 'components'

class CoinList extends React.Component{
    state={
        loading: true,
        list: [],
    }

    handleGet = async (type, data) =>{
       const newList = await get(type, data)
       this.setState({ list: newList, loading: false })
    }

    componentDidMount(){
        this.handleGet('market', this.props)
    }

    componentDidUpdate(prevProps){
        if(prevProps!== this.props){
            this.handleGet('market', this.props)
        }
    }

    render(){
        const { list, loading } = this.state
        return(
            <div>
                {
                  loading ?  (<div>Loading...</div>):
                  (
                    list && list.map( i=>
                        <ListedCoin 
                            key={i.id} 
                            data={i}
                        />
                        )
                    )
                }
            </div>
        )
    }
}

export default CoinList