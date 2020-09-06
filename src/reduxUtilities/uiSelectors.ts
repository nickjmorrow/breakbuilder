import { AppState } from 'reduxUtilities/AppState';
import { createSelector } from 'reselect';
import { isSelectedDate } from 'typeGuards/isSelectedDate';

const getUiSlice = (state: AppState) => state.ui;

const getCalendarDates = (state: AppState) => getUiSlice(state).calendarDates;

const getNumVacationDates = (state: AppState) => getUiSlice(state).numVacationDates;

export const numRemainingVacationDatesSelector = createSelector(
	getCalendarDates,
	getNumVacationDates,
	(calendarDates, numVacationDates) =>
		numVacationDates -
		calendarDates.reduce((agg, cur) => {
			if (isSelectedDate(cur)) {
				agg += 1;
			}
			return agg;
		}, 0),
);