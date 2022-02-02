import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { CoinList, CoinPage, Portfolio } from 'pages';

import './App.css';

class App extends React.Component{
  render(){
    return(
      <>
      <Router>
        <Switch>
          <Route path='/' ><CoinList/></Route>
          <Route path='/portfolio'><Portfolio/></Route>
          <Route path='/coin/:coinId' ><CoinPage/></Route>
        </Switch>
      </Router>
      </>
    )
  }
}

export default App;
