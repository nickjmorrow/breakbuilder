import { UiState } from '~/reduxUtilities/uiReducer';

const KEY = 'INITIAL_STATE';

export const localStorageManager = {
    getState: (): UiState | null => {
        try {
            const rawValue = localStorage.getItem(KEY);
            if (rawValue === null) {
                return null;
            }
            const value = JSON.parse(rawValue) as UiState;
            return { ...value, calendarDates: value.calendarDates.map(cd => ({ ...cd, date: new Date(cd.date) })) };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    setState: (state: UiState): boolean => {
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
};
