import { CalendarDate } from 'types/CalendarDate';

export const isWeekend = (calendarDate: CalendarDate) => calendarDate.weekDay === 0 || calendarDate.weekDay === 6;
