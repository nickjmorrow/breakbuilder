import { action } from 'typesafe-actions';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';

export enum CalendarActionKeys {
    TOGGLE_DATE = 'TOGGLE_DATE',
    SET_YEAR = 'SET_YEAR',
    SET_MONTH = 'SET_MONTH',
    TOGGLE_HOLIDAY = 'TOGGLE_HOLIDAY',
}

const toggleDate = ({
    date,
    target,
}: {
    date: EmptyDate | SelectedDate | HolidayDate;
    target: 'selected' | 'holiday';
}) => action(CalendarActionKeys.TOGGLE_DATE, { date, target });

const setYear = (year: number) => action(CalendarActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(CalendarActionKeys.SET_MONTH, month);

const toggleHoliday = (date: EmptyDate | SelectedDate | HolidayDate) => action(CalendarActionKeys.TOGGLE_HOLIDAY, date);

export const calendarActions = {
    toggleDate,
    setYear,
    setMonth,
    toggleHoliday,
};
