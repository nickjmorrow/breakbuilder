import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { calendarActions, CalendarActionKeys } from '~/calendar/state/calendarActions';
import { isCalendarDateEqual } from '~/calendar/utilities/isCalendarDateEqual';
import { getCalendarDatesForYear } from '~/calendar/utilities/getCalendarDatesForYear';
import { isSelectedDate } from '~/calendar/typeGuards/isSelectedDate';
import { getSelectedDate } from '~/calendar/dateTypeProviders/getSelectedDate';
import { getEmptyDate } from '~/calendar/dateTypeProviders/getEmptyDate';
import { getUpdatedConnectedDates } from '~/calendar/utilities/getUpdatedConnectedDates';
import { getCurrentYear } from '~/calendar/utilities/getCurrentYear';
import { isEmptyDate } from '~/calendar/typeGuards/isEmptyDate';
import { getHolidayDate } from '~/calendar/dateTypeProviders/getHolidayDate';
import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';
import { getCurrentMonth } from '~/calendar/utilities/getCurrentMonth';
import { getConnectedDate } from '~/calendar/dateTypeProviders/getConnectedDate';

export type CalendarState = Readonly<typeof calendarInitialState>;

const currentYear = getCurrentYear();
const currentMonth = getCurrentMonth();
const initialCalendarDates = getUpdatedConnectedDates([...getCalendarDatesForYear(currentYear)]);

const calendarInitialState = {
    calendarDates: initialCalendarDates,
    currentMonth,
    currentYear,
};

export const calendarReducer = (
    state: CalendarState = calendarInitialState,
    action: ActionType<typeof calendarActions>,
) => {
    switch (action.type) {
        case CalendarActionKeys.TOGGLE_DATE:
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
        case CalendarActionKeys.SET_MONTH:
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
        case CalendarActionKeys.SET_YEAR:
            return produce(state, draftState => {
                draftState.currentYear = action.payload;
                draftState.calendarDates = getUpdatedConnectedDates(getCalendarDatesForYear(action.payload));
            });
        default:
            return state;
    }
};
