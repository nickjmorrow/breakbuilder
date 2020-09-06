import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from '~/reduxUtilities/store';
import { getBaseUrl } from '~/utilities/getBaseUrl';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

axios.defaults.baseURL = getBaseUrl();

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
