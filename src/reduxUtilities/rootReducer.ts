import { combineReducers } from 'redux';
import { calendarReducer } from '~/calendar/state/calendarReducer';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
    ui: calendarReducer,
    routing: routerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
