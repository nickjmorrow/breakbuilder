// external
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// inter
import { App } from '~/App';
import { store } from '~/reduxUtilities/store';
import { ThemeProvider } from '~/theming/ThemeProvider';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
