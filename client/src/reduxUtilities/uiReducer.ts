import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { getCalendarDatesForYear } from 'utilities/getCalendarDatesForYear';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { getSelectedDate } from 'dateTypeProviders/getSelectedDate';
import { getEmptyDate } from 'dateTypeProviders/getEmptyDate';
import { getUpdatedConnectedDates } from 'utilities/getUpdatedConnectedDates';
import { getCurrentYear } from 'utilities/dateUtilities/getCurrentYear';
import { isEmptyDate } from 'typeGuards/isEmptyDate';
import { getHolidayDate } from 'dateTypeProviders/getHolidayDate';
import { isHolidayDate } from 'typeGuards/isHolidayDate';

export type UiState = Readonly<typeof initialState>;

const currentYear = getCurrentYear();
const thisYearsDates = getCalendarDatesForYear(currentYear);

const initialState = {
	calendarDates: thisYearsDates,
	currentMonth: 0,
	currentYear,
	numVacationDates: 10,
	hasCheckedForSavedVacationPlan: false,
	getVacationPlanSuccess: null as true | false | null,
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

				if (!isEmptyDate(foundDate) && !isSelectedDate(foundDate) && !isHolidayDate(foundDate)) {
					throw new Error('Unexpected date type was toggled.');
				}

				const getNewDate = (date: typeof action.payload) => {
					switch (date.type) {
						case 'empty':
							return getSelectedDate(date);
						case 'selected':
							return getHolidayDate(date);
						case 'holiday':
							return getEmptyDate(date);
						default:
							throw new Error('Should never get here.');
					}
				};

				draftState.calendarDates[foundDateIndex] = getNewDate(foundDate);

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
		case UiActionKeys.SET_NUM_VACATION_DATES:
			return produce(state, draftState => {
				draftState.numVacationDates = action.payload;
			});
		case UiActionKeys.GET_VACATION_PLAN_SUCCESS:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					action.payload.calendarDates.map(cd => ({ ...cd, date: new Date(cd.date) })),
				);

				draftState.getVacationPlanSuccess = true;
			});
		case UiActionKeys.GET_VACATION_PLAN_FAILURE:
			return produce(state, draftState => {
				draftState.getVacationPlanSuccess = false;
			});
		default:
			return state;
	}
};
