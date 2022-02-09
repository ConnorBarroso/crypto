import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { CoinList, CoinPage, Portfolio } from 'pages';
import './App.css';

class App extends React.Component{
  state ={
    toggle: false,
    currency:'usd',
    sortBy: 'market_cap',
    order: 'desc',
    portfolio:{}
  }

  componentDidMount(){
     const localCurrency = localStorage.getItem('currency')
     localCurrency && this.setState({ currency: localCurrency})
  }

  handleToggle = () =>{
    this.setState({ toggle: !this.state.toggle  })
  }

  handleCurrencyChange = (newCurrency) =>{
    localStorage.setItem('currency', newCurrency)
    this.setState({ currency: newCurrency, toggle: false })
  }

  render(){
    const {toggle, currency, order, sortBy, portfolio} = this.state
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
        <Switch>
          <Route exact path={'/'} render={()=><CoinList order={order} currency={currency} sortBy={sortBy} />}/>
          <Route exact path='/portfolio' component={Portfolio}/>
          <Route exact path='/coin/:coinId/' component={CoinPage}/>
        </Switch>
      </Router>
      </>
    )
  }
}

export default App;
