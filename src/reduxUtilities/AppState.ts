import { CalendarState } from '~/calendar/state/calendarReducer';

// TODO: Make this dependent on rootReducer.
export interface AppState {
    ui: CalendarState;
}
