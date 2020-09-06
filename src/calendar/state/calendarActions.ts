import { action } from 'typesafe-actions';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';

export enum CalendarActionKeys {
    TOGGLE_DATE = 'TOGGLE_DATE',
    SET_YEAR = 'SET_YEAR',
    SET_MONTH = 'SET_MONTH',
}

const toggleDate = (date: EmptyDate | SelectedDate | HolidayDate) => action(CalendarActionKeys.TOGGLE_DATE, date);

const setYear = (year: number) => action(CalendarActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(CalendarActionKeys.SET_MONTH, month);

export const calendarActions = {
    toggleDate,
    setYear,
    setMonth,
};
