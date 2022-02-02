import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import { CoinList, CoinPage, Portfolio } from 'pages';

import './App.css';

class App extends React.Component{
  render(){
    return(
      <>
      <Router>
        <Switch>
          <Route path='/' element={CoinList}/>
          <Route path='/portfolio' element={Portfolio}/>
          <Route path='/coin/:coinId' element={CoinPage}/>
        </Switch>
      </Router>
      </>
    )
  }
}

export default App;
