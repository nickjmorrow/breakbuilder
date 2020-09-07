import { AppState } from '~/reduxUtilities/AppState';
import { createSelector } from 'reselect';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { isSelectedDate } from '~/calendar/typeGuards/isSelectedDate';
import { isConnectedDate } from '~/calendar/typeGuards/isConnectedDate';
import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';

const currentYearSelector = (state: AppState) => state.ui.currentYear;

const calendarDatesSelector = (state: AppState) => state.ui.calendarDates;

const currentYearDatesSelector = createSelector(
    currentYearSelector,
    calendarDatesSelector,
    (currentYear, calendarDates): CalendarDate[] => calendarDates.filter(cd => cd.date.getFullYear() === currentYear),
);

const currentYearSelectedDates = createSelector(currentYearDatesSelector, dates => dates.filter(isSelectedDate));

const currentYearConnectedDates = createSelector(currentYearDatesSelector, dates => dates.filter(isConnectedDate));

const currentYearHolidayDates = createSelector(currentYearDatesSelector, dates => dates.filter(isHolidayDate));

export const calendarSelectors = {
    currentYearSelector,
    calendarDatesSelector,
    currentYearDatesSelector,
    currentYearSelectedDates,
    currentYearConnectedDates,
    currentYearHolidayDates,
};
