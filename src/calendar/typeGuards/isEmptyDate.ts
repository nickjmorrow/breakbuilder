import { EmptyDate } from '~/calendar/types/EmptyDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';

export const isEmptyDate = (calendarDate: CalendarDate): calendarDate is EmptyDate =>
    (calendarDate as EmptyDate).type === 'empty';
