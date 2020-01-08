import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { getCalendarDatesForYear } from 'utilities/getCalendarDatesForYear';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { getSelectedDate } from 'dateTypeProviders/getSelectedDate';
import { getEmptyDate } from 'dateTypeProviders/getEmptyDate';
import { getUpdatedConnectedDates } from 'utilities/getUpdatedConnectedDates';
import { getCurrentYear } from 'utilities/getCurrentYear';
import { getUpdatedDates } from 'utilities/getUpdatedDates';

export type UiState = Readonly<typeof initialState>;

const currentYear = getCurrentYear();
const initialState = {
	calendarDates: getCalendarDatesForYear(currentYear),
	currentMonth: 0,
	currentYear,
	numVacationDays: 10,
};

export const uiReducer = (state: UiState = initialState, action: ActionType<typeof uiActions>) => {
	switch (action.type) {
		case UiActionKeys.ADD_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					draftState.calendarDates.map(cd =>
						isCalendarDateEqual(cd, action.payload) ? getSelectedDate(cd) : cd,
					),
				);
			});
		case UiActionKeys.REMOVE_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					draftState.calendarDates.map(sd =>
						isCalendarDateEqual(sd, action.payload) ? getEmptyDate(sd) : sd,
					),
				);
			});
		case UiActionKeys.TOGGLE_DATE:
			return produce(state, draftState => {
				const foundDateIndex = draftState.calendarDates.findIndex(sd =>
					isCalendarDateEqual(sd, action.payload),
				);
				const foundDate = draftState.calendarDates[foundDateIndex];
				draftState.calendarDates[foundDateIndex] = isSelectedDate(foundDate)
					? getEmptyDate(foundDate)
					: getSelectedDate(foundDate);

				draftState.calendarDates = getUpdatedConnectedDates(draftState.calendarDates);
			});
		case UiActionKeys.SET_MONTH:
			return produce(state, draftState => {
				draftState.currentMonth = action.payload;
			});
		case UiActionKeys.SET_YEAR:
			return produce(state, draftState => {
				draftState.currentYear = action.payload;
				draftState.calendarDates = getUpdatedConnectedDates(getCalendarDatesForYear(action.payload));
			});
		case UiActionKeys.GET_SUGGESTED_DATES:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					getUpdatedDates(draftState.calendarDates, draftState.numVacationDays),
				);
			});
		default:
			return state;
	}
};
