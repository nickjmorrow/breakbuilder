import { combineReducers } from 'redux';
import { calendarReducer } from '~/calendar/state/calendarReducer';

export const rootReducer = combineReducers({
    calendar: calendarReducer,
});
