import './index.css'
import './language/i18n.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'rendition'

import App from './App'

const container = document.getElementById('root')
// * turn off dragging for all HTML element
window.ondragstart = () => {
  return false
}
ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  container,
)
