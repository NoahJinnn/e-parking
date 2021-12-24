import './App.scss'
import 'normalize.css'
import 'tachyons'
import 'animate.css'

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

import Prompter from './components/modals/Prompter'
import CheckinPage from './pages/checkin-page/CheckinPage'
import CheckoutPage from './pages/checkout-page/CheckoutPage'
import IntroPage from './pages/intro-page/IntroPage'

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.

const lib = library as any
lib.add(fasStar, farStar)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Prompter />
        <Switch>
          <Route exact={true} path="/">
            <IntroPage />
          </Route>
          <Route path="/checkin">
            <CheckinPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
        </Switch>
      </div>
    )
  }
}
export default App
