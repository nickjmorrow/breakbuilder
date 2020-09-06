import 'normalize.css';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Main } from '~/components/Main';
import { ThemeProvider } from '~/theming/ThemeProvider';

const AppInternal: React.FC<RouteComponentProps> = ({ location }) => {
    return (
        <div className="App">
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        </div>
    );
};

export const App = withRouter(AppInternal);
