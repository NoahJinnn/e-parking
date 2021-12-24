import 'tachyons';
import 'tachyons-animate';
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import i18n from '@languages/i18n';
import * as serviceWorker from '@utils/serviceWorker';

import { RootRouter } from './router';

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <RecoilRoot>
                <ToastContainer toastClassName="br-pill-ns" position="top-center" />
                <RootRouter />
            </RecoilRoot>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
