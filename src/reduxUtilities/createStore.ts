import { createStore as reduxCreateStore } from 'redux';
import { rootReducer } from 'reduxUtilities/rootReducer';

export const createStore = () =>
	reduxCreateStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
