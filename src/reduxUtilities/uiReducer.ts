import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';

import { CalendarDate } from 'types/CalendarDate';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { ConnectedDate } from 'types/ConnectedDate';
import { SuggestedDate } from 'types/SuggestedDate';
import { SelectedDate } from 'types/SelectedDate';

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
					sd => !(sd.day === action.payload.day && sd.month === action.payload.month),
				);
				draftState.connectedDates = getConnectedDates(draftState.selectedDates);
			});
		case UiActionKeys.TOGGLE_DATE:
			return produce(state, draftState => {
				const containsDate = draftState.selectedDates.some(
					sd =>
						sd.day === action.payload.day &&
						sd.month === action.payload.month &&
						sd.year === action.payload.year,
				);
				const withoutDate = draftState.selectedDates.filter(
					sd => !(sd.day === action.payload.day && sd.month === action.payload.month),
				);
				const withDate = [...draftState.selectedDates, { ...action.payload, type: 'selected' }];
				draftState.selectedDates = containsDate ? withoutDate : withDate;
			});
		default:
			return state;
	}
};

const getConnectedDates = (dates: SelectedDate[]): ConnectedDate[] => {
	return [];
};
