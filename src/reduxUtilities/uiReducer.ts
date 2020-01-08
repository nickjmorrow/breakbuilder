import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { ConnectedDate } from 'types/ConnectedDate';
import { SuggestedDate } from 'types/SuggestedDate';
import { SelectedDate } from 'types/SelectedDate';
import { EmptyDate } from 'types/EmptyDate';
import { WrappedDate } from 'types/WrappedDate';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { CalendarDate } from 'types/CalendarDate';
import { getCalendarDatesForYear } from 'utilities/getCalendarDatesForYear';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { isSelectedDate } from 'typeGuards/isSelectedDate';

export type UiState = Readonly<typeof initialState>;

// TODO: Consolidate selectedDates, connectedDates, and suggestedDates within calendarDates.
// Initially populate calendarDates with emptyDates based on chosen year.
const initialState = {
	selectedDates: [] as SelectedDate[],
	connectedDates: [] as ConnectedDate[],
	suggestedDates: [] as SuggestedDate[],
	calendarDates: [] as CalendarDate[],
	currentMonth: 0,
	currentYear: 2019,
};

const getSelectedDate = (calendarDate: CalendarDate): SelectedDate => ({
	...calendarDate,
	type: 'selected',
});

const getEmptyDate = (calendarDate: CalendarDate): EmptyDate => ({
	...calendarDate,
	type: 'empty',
});

const getConnectedDate = (calendarDate: CalendarDate): ConnectedDate => ({
	...calendarDate,
	type: 'connected',
});

export const uiReducer = (state: UiState = initialState, action: ActionType<typeof uiActions>) => {
	switch (action.type) {
		case UiActionKeys.ADD_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getConnectedDates(
					draftState.calendarDates.map(cd =>
						isCalendarDateEqual(cd, action.payload) ? getSelectedDate(cd) : cd,
					),
				);
			});
		case UiActionKeys.REMOVE_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getConnectedDates(
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
					? getSelectedDate(foundDate)
					: getEmptyDate(foundDate);

				draftState.calendarDates = getConnectedDates(draftState.calendarDates);
			});
		case UiActionKeys.SET_MONTH:
			return produce(state, draftState => {
				draftState.currentMonth = action.payload;
			});
		case UiActionKeys.SET_YEAR:
			return produce(state, draftState => {
				draftState.currentYear = action.payload;
				draftState.calendarDates = getConnectedDates(getCalendarDatesForYear(action.payload));
			});
		default:
			return state;
	}
};

const getConnectedDates = (dates: CalendarDate[]): CalendarDate[] => {
	const connectedDates: ConnectedDate[] = [];
	const alreadyExists = (newDate: WrappedDate) => connectedDates.some(cd => isCalendarDateEqual(cd, newDate));
	const asConnectedDate = (calendarDate: WrappedDate): ConnectedDate => ({ ...calendarDate, type: 'connected' });
	const addIfNotExists = (newDate: WrappedDate) =>
		!alreadyExists(newDate) && connectedDates.push(asConnectedDate(newDate));
	dates
		.filter(d => isSelectedDate(d))
		.forEach(d => {
			if (d.date.getDay() === 5) {
				addIfNotExists({ date: getOffsetDate(d.date, 1) });
				addIfNotExists({ date: getOffsetDate(d.date, 2) });
			}
			if (d.date.getDay() === 1) {
				addIfNotExists({ date: getOffsetDate(d.date, -1) });
				addIfNotExists({ date: getOffsetDate(d.date, -2) });
			}
		});

	const isNewConnectedDate = (date: CalendarDate) => connectedDates.some(cd => isCalendarDateEqual(cd, date));

	const convertDate = (date: CalendarDate): CalendarDate => {
		if (isNewConnectedDate(date)) {
			return getConnectedDate(date);
		}

		// was connected, now it is empty
		if (isConnectedDate(date)) {
			return getEmptyDate(date);
		}

		return date;
	};

	return dates.map(convertDate);
};

const getOffsetDate = (date: Date, offset: number) => {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + offset);
	return newDate;
};
