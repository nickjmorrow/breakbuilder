import { action } from 'typesafe-actions';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';

export enum CalendarActionKeys {
    TOGGLE_DATE = 'TOGGLE_DATE',
    SET_MONTH = 'SET_MONTH',
}

const toggleDate = ({
    date,
    target,
}: {
    date: EmptyDate | SelectedDate | HolidayDate;
    target: 'selected' | 'holiday';
}) => action(CalendarActionKeys.TOGGLE_DATE, { date, target });

const setMonth = (month: number) => action(CalendarActionKeys.SET_MONTH, month);

export const calendarActions = {
    toggleDate,
    setMonth,
};
