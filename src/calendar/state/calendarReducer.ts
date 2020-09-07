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
import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';
import { getCurrentMonth } from '~/calendar/utilities/getCurrentMonth';
import { getConnectedDate } from '~/calendar/dateTypeProviders/getConnectedDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { getHolidayDate } from '~/calendar/dateTypeProviders/getHolidayDate';

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
                const { date, target } = action.payload;
                const foundDateIndex = draftState.calendarDates.findIndex(sd => isCalendarDateEqual(sd, date));

                const foundDate = draftState.calendarDates[foundDateIndex];

                if (!isEmptyDate(foundDate) && !isSelectedDate(foundDate) && !isHolidayDate(foundDate)) {
                    throw new Error('Unexpected date type was toggled.');
                }
                updateConnectedDates(foundDate, foundDateIndex, draftState.calendarDates, target);
            });
        case CalendarActionKeys.SET_MONTH:
            return produce(state, draftState => {
                const month = action.payload;
                if (month === 12) {
                    draftState.currentMonth = 0;
                    draftState.currentYear += 1;
                } else if (month === -1) {
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

const updateConnectedDates = (
    foundDate: CalendarDate,
    foundDateIndex: number,
    calendarDates: CalendarDate[],
    target: 'selected' | 'holiday',
) => {
    switch (foundDate.type) {
        case 'empty':
            calendarDates[foundDateIndex] =
                target === 'selected' ? getSelectedDate(foundDate) : getHolidayDate(foundDate);
            if (foundDateIndex < 2 || foundDateIndex > calendarDates.length - 2) {
                return;
            }
            if (foundDate.date.getDay() === 5) {
                calendarDates[foundDateIndex + 1] = getConnectedDate(calendarDates[foundDateIndex + 1]);
                calendarDates[foundDateIndex + 2] = getConnectedDate(calendarDates[foundDateIndex + 2]);
            }
            if (foundDate.date.getDay() === 1) {
                calendarDates[foundDateIndex - 1] = getConnectedDate(calendarDates[foundDateIndex - 1]);
                calendarDates[foundDateIndex - 2] = getConnectedDate(calendarDates[foundDateIndex - 2]);
            }
            return;
        case 'selected':
        case 'holiday':
            calendarDates[foundDateIndex] = getEmptyDate(foundDate);
            if (foundDate.date.getDay() === 5 && isEmptyDate(calendarDates[foundDateIndex + 3])) {
                calendarDates[foundDateIndex + 1] = getEmptyDate(calendarDates[foundDateIndex + 1]);
                calendarDates[foundDateIndex + 2] = getEmptyDate(calendarDates[foundDateIndex + 2]);
            }
            if (foundDate.date.getDay() === 1 && isEmptyDate(calendarDates[foundDateIndex - 3])) {
                calendarDates[foundDateIndex - 1] = getEmptyDate(calendarDates[foundDateIndex - 1]);
                calendarDates[foundDateIndex - 2] = getEmptyDate(calendarDates[foundDateIndex - 2]);
            }
            return;
    }
};
