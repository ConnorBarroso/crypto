import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { CoinList, CoinPage, Portfolio } from 'pages';
import { HeaderInfo } from 'components';
import './App.css';

class App extends React.Component{
  state ={
    toggle: false,
    fetchData:{
      currency:'usd',
      sortBy: 'market_cap',
      order: 'desc',
      page: 1
    },
    portfolio:[]
  }
  
  

  componentDidMount(){
    const localCurrency = localStorage.getItem('currency')
    localCurrency && this.setState(prevState =>({ fetchData:{ ...prevState.fetchData, currency: localCurrency } }))
  }

  handleToggle = () =>{
    this.setState({ toggle: !this.state.toggle  })
  }

  handleFetchDataChange = (type, value) =>{
    switch(type){
      default: console.error('unknown type') 
      break;

      case 'currency':  
        this.setState(prevState =>({  toggle: false, fetchData: {...prevState.fetchData, currency: value} }))
        localStorage.setItem('currency', value)
      break;

      case 'sortBy' :
        if( value === this.state.fetchData.sortBy) return
        this.setState(prevState =>({  fetchData: {...prevState.fetchData, sortBy: value} }))
      break;

      case 'order':
        if( value === this.state.fetchData.order) return
        this.setState(prevState =>({  fetchData: {...prevState.fetchData, order: value} }))
      break;

    }
     
  }

  render(){
    const {toggle, fetchData} = this.state
    const {currency} = fetchData
    const currencyArray= [ 'usd', 'cad', 'eur', 'gbp' ]
    const dropdownArray = currencyArray.filter(i => i !== currency)
    return(
      <>
      <Router>
          <nav>
            <Link to='/'>Coins</Link>
            <Link to='/portfolio'>Portfolio</Link>
          </nav>
          <div>
            <div>{currency}</div>
            <button onClick={this.handleToggle}>↓</button>
            {
              toggle && <div>{dropdownArray.map(i => <button onClick={()=>this.handleFetchDataChange('currency',i)} key={i}>{i}</button>)}</div>
            }
          </div>
          <HeaderInfo/>
        <Switch>
          <Route exact path={'/'} render={()=> <CoinList fetchData={this.state.fetchData} handleFetchDataChange={this.handleFetchDataChange} />}/>
          <Route exact path='/portfolio' component={Portfolio}/>
          <Route exact path='/coin/:coinId/' component={CoinPage}/>
        </Switch>
      </Router>
      </>
    )
  }
}

export default App;
