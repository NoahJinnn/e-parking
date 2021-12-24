import 'styles/index.scss';
import './language/i18n.js';
import 'tachyons';
import 'animate.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import { AppSwitcher } from './router';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <AppSwitcher />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
