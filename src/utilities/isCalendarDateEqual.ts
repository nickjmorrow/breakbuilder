import { CalendarDate } from 'types/CalendarDate';

export const isCalendarDateEqual = (firstDate: CalendarDate, secondDate: CalendarDate) => {
	return (
		firstDate.date.getDate() === secondDate.date.getDate() &&
		firstDate.date.getMonth() === secondDate.date.getMonth() &&
		firstDate.date.getFullYear() === secondDate.date.getFullYear()
	);
};
