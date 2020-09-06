import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { uiActions, UiActionKeys } from '~/reduxUtilities/uiActions';
import { isCalendarDateEqual } from '~/utilities/isCalendarDateEqual';
import { getCalendarDatesForYear } from '~/utilities/getCalendarDatesForYear';
import { isSelectedDate } from '~/typeGuards/isSelectedDate';
import { getSelectedDate } from '~/dateTypeProviders/getSelectedDate';
import { getEmptyDate } from '~/dateTypeProviders/getEmptyDate';
import { getUpdatedConnectedDates } from '~/utilities/getUpdatedConnectedDates';
import { getCurrentYear } from '~/utilities/dateUtilities/getCurrentYear';
import { isEmptyDate } from '~/typeGuards/isEmptyDate';
import { getHolidayDate } from '~/dateTypeProviders/getHolidayDate';
import { isHolidayDate } from '~/typeGuards/isHolidayDate';
import { getCurrentMonth } from '~/utilities/dateUtilities/getCurrentMonth';
import { getConnectedDate } from '~/dateTypeProviders/getConnectedDate';

export type UiState = Readonly<typeof initialState>;

const currentYear = getCurrentYear();
const currentMonth = getCurrentMonth();
const initialCalendarDates = getUpdatedConnectedDates([...getCalendarDatesForYear(currentYear)]);

const initialState = {
    calendarDates: initialCalendarDates,
    currentMonth,
    currentYear,
};

export const uiReducer = (state: UiState = initialState, action: ActionType<typeof uiActions>) => {
    switch (action.type) {
        case UiActionKeys.TOGGLE_DATE:
            return produce(state, draftState => {
                const t0 = performance.now();
                const foundDateIndex = draftState.calendarDates.findIndex(sd =>
                    isCalendarDateEqual(sd, action.payload),
                );

                const foundDate = draftState.calendarDates[foundDateIndex];

                if (!isEmptyDate(foundDate) && !isSelectedDate(foundDate) && !isHolidayDate(foundDate)) {
                    throw new Error('Unexpected date type was toggled.');
                }

                switch (foundDate.type) {
                    case 'empty':
                        draftState.calendarDates[foundDateIndex] = getSelectedDate(foundDate);
                        if (foundDateIndex < 2 || foundDateIndex > draftState.calendarDates.length - 2) {
                            return;
                        }
                        if (foundDate.date.getDay() === 5) {
                            draftState.calendarDates[foundDateIndex + 1] = getConnectedDate(
                                draftState.calendarDates[foundDateIndex + 1],
                            );
                            draftState.calendarDates[foundDateIndex + 2] = getConnectedDate(
                                draftState.calendarDates[foundDateIndex + 2],
                            );
                        }
                        if (foundDate.date.getDay() === 1) {
                            draftState.calendarDates[foundDateIndex - 1] = getConnectedDate(
                                draftState.calendarDates[foundDateIndex - 1],
                            );
                            draftState.calendarDates[foundDateIndex - 2] = getConnectedDate(
                                draftState.calendarDates[foundDateIndex - 2],
                            );
                        }
                        // console.log(performance.now() - t0);
                        return;
                    case 'selected':
                        draftState.calendarDates[foundDateIndex] = getEmptyDate(foundDate);
                        if (foundDate.date.getDay() === 5) {
                            draftState.calendarDates[foundDateIndex + 1] = getEmptyDate(
                                draftState.calendarDates[foundDateIndex + 1],
                            );
                            draftState.calendarDates[foundDateIndex + 2] = getEmptyDate(
                                draftState.calendarDates[foundDateIndex + 2],
                            );
                        }
                        if (foundDate.date.getDay() === 1) {
                            draftState.calendarDates[foundDateIndex - 1] = getEmptyDate(
                                draftState.calendarDates[foundDateIndex - 1],
                            );
                            draftState.calendarDates[foundDateIndex - 2] = getEmptyDate(
                                draftState.calendarDates[foundDateIndex - 2],
                            );
                        }
                        // console.log(performance.now() - t0);
                        return;
                }
            });
        case UiActionKeys.SET_MONTH:
            return produce(state, draftState => {
                const month = action.payload;
                if (month === 12) {
                    draftState.currentMonth = 0;
                    draftState.currentYear += 1;
                } else if (currentMonth === -1) {
                    draftState.currentMonth = 11;
                    draftState.currentYear -= 1;
                } else {
                    draftState.currentMonth = month;
                }

                const previousYear = draftState.currentYear - 1;
                const nextYear = draftState.currentYear + 1;

                if (
                    draftState.currentMonth === 0 &&
                    !draftState.calendarDates.some(cd => cd.date.getFullYear() === previousYear)
                ) {
                    draftState.calendarDates = [...getCalendarDatesForYear(previousYear), ...draftState.calendarDates];
                }

                if (
                    draftState.currentMonth === 11 &&
                    !draftState.calendarDates.some(cd => cd.date.getFullYear() === nextYear)
                ) {
                    draftState.calendarDates = [...draftState.calendarDates, ...getCalendarDatesForYear(nextYear)];
                }
            });
        case UiActionKeys.SET_YEAR:
            return produce(state, draftState => {
                draftState.currentYear = action.payload;
                draftState.calendarDates = getUpdatedConnectedDates(getCalendarDatesForYear(action.payload));
            });
        default:
            return state;
    }
};
