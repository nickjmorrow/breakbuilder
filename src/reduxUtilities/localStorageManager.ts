import { CalendarState } from '~/calendar/state/calendarReducer';

const KEY = 'INITIAL_STATE';

export const localStorageManager = {
    getState: (): CalendarState | null => {
        try {
            const rawValue = localStorage.getItem(KEY);
            if (rawValue === null) {
                return null;
            }
            const value = JSON.parse(rawValue) as CalendarState;
            return { ...value, calendarDates: value.calendarDates.map(cd => ({ ...cd, date: new Date(cd.date) })) };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    setState: (state: CalendarState): boolean => {
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
};
