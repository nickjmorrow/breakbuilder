import { CalendarDate } from 'types/CalendarDate';

export const isCalendarDateEqual = (firstDate: CalendarDate, secondDate: CalendarDate) =>
	firstDate.day === secondDate.day && firstDate.month === secondDate.month && firstDate.year === secondDate.year;
