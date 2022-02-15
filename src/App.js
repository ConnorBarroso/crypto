import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { CoinList, CoinPage, Portfolio } from 'pages';
import { HeaderInfo } from 'components';
import { get } from 'utils';
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
    portfolio:{}
  }
  
  

  componentDidMount(){
    const localCurrency = localStorage.getItem('currency')
    localCurrency && this.setState(prevState =>({ fetchData:{ ...prevState.fetchData, currency: localCurrency } }))
  }

  handleToggle = () =>{
    this.setState({ toggle: !this.state.toggle  })
  }

  handleCurrencyChange = (newCurrency) =>{
    this.setState(prevState =>({  toggle: false, fetchData: {...prevState.fetchData, currency: newCurrency} }))
    localStorage.setItem('currency', newCurrency)
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
              toggle && <div>{dropdownArray.map(i => <button onClick={()=>this.handleCurrencyChange(i)} key={i}>{i}</button>)}</div>
            }
          </div>
          <HeaderInfo/>
        <Switch>
          <Route exact path={'/'} render={()=> <CoinList fetchData={this.state.fetchData} />}/>
          <Route exact path='/portfolio' component={Portfolio}/>
          <Route exact path='/coin/:coinId/' component={CoinPage}/>
        </Switch>
      </Router>
      </>
    )
  }
}

export default App;
