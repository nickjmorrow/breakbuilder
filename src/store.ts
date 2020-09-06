// external
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

// intra
import { rootReducer } from '~/reduxUtilities/rootReducer';
import { rootSaga } from '~/reduxUtilities/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const middleware = [sagaMiddleware];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

    sagaMiddleware.run(rootSaga);
    return store;
};

export const store = configureStore();
