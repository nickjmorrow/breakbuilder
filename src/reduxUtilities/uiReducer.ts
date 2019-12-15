import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';

import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { ConnectedDate } from 'types/ConnectedDate';
import { SuggestedDate } from 'types/SuggestedDate';
import { SelectedDate } from 'types/SelectedDate';
import { CalendarDate } from 'types/CalendarDate';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';

export type UiState = Readonly<typeof initialState>;

const initialState = {
	selectedDates: [] as SelectedDate[],
	connectedDates: [] as ConnectedDate[],
	suggestedDates: [] as SuggestedDate[],
	currentMonth: 0,
	currentYear: 2019,
};

export const uiReducer = (state: UiState = initialState, action: ActionType<typeof uiActions>) => {
	switch (action.type) {
		case UiActionKeys.ADD_DATE:
			return produce(state, draftState => {
				draftState.selectedDates.push({ ...action.payload, type: 'selected' });
				draftState.connectedDates = getConnectedDates(draftState.selectedDates);
			});
		case UiActionKeys.REMOVE_DATE:
			return produce(state, draftState => {
				draftState.selectedDates = draftState.selectedDates.filter(
					sd => !isCalendarDateEqual(sd, action.payload),
				);
				draftState.connectedDates = getConnectedDates(draftState.selectedDates);
			});
		case UiActionKeys.TOGGLE_DATE:
			return produce(state, draftState => {
				const containsDate = draftState.selectedDates.some(sd => isCalendarDateEqual(sd, action.payload));
				const withoutDate = draftState.selectedDates.filter(sd => !isCalendarDateEqual(sd, action.payload));
				const withDate = [...draftState.selectedDates, { ...action.payload, type: 'selected' }];
				draftState.selectedDates = containsDate ? withoutDate : withDate;
				draftState.connectedDates = getConnectedDates(draftState.selectedDates);
			});
		case UiActionKeys.SET_MONTH:
			return produce(state, draftState => {
				draftState.currentMonth = action.payload;
			});
		case UiActionKeys.SET_YEAR:
			return produce(state, draftState => {
				draftState.currentYear = action.payload;
			});
		default:
			return state;
	}
};

const getConnectedDates = (dates: SelectedDate[]): ConnectedDate[] => {
	const connectedDates: ConnectedDate[] = [];
	const alreadyExists = (newDate: CalendarDate) => connectedDates.some(cd => isCalendarDateEqual(cd, newDate));
	const asConnectedDate = (calendarDate: CalendarDate): ConnectedDate => ({ ...calendarDate, type: 'connected' });
	const addIfNotExists = (newDate: CalendarDate) =>
		!alreadyExists(newDate) && connectedDates.push(asConnectedDate(newDate));
	dates.forEach(d => {
		if (d.date.getDay() === 5) {
			addIfNotExists({ date: getOffsetDate(d.date, 1) });
			addIfNotExists({ date: getOffsetDate(d.date, 2) });
		}
		if (d.date.getDay() === 1) {
			addIfNotExists({ date: getOffsetDate(d.date, -1) });
			addIfNotExists({ date: getOffsetDate(d.date, -2) });
		}
	});

	return connectedDates;
};

const getOffsetDate = (date: Date, offset: number) => {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + offset);
	return newDate;
};
