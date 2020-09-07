// external
import { applyMiddleware, compose, createStore, Middleware } from 'redux';

// inter
import { rootReducer } from '~/reduxUtilities/rootReducer';
import { AppState } from '~/reduxUtilities/AppState';
import { localStorageManager } from '~/reduxUtilities/localStorageManager';

const configureStore = (initialState: AppState | null) => {
    const middleware: Middleware[] = [];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const intermediateStore = createStore(
        rootReducer,
        initialState !== null ? initialState : undefined,
        compose(applyMiddleware(...middleware), ...enhancers),
    );

    return intermediateStore;
};

const calendarState = localStorageManager.getState();

const initialState = calendarState !== null ? { calendar: calendarState } : null;

const store = configureStore(initialState);

store.subscribe(() => {
    const state = store.getState().calendar;
    localStorageManager.setState(state);
});

export { store };
