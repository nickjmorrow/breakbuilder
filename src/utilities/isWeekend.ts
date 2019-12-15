import { CalendarDate } from 'types/CalendarDate';

export const isWeekend = (calendarDate: CalendarDate) =>
	calendarDate.date.getDay() === 0 || calendarDate.date.getDay() === 6;
