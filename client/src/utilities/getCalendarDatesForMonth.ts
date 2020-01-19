import { Calendar as CalendarUtil } from 'calendar-base';
import { EmptyDate } from 'types/EmptyDate';

export const getCalendarDatesForMonth = (year: number, month: number): EmptyDate[] => {
	const calendarUtil = new CalendarUtil();

	const days = calendarUtil.getCalendar(year, month);
	const toCalendarDate = (intermediateShape: IntermediateShape): EmptyDate => {
		const newDate = new Date();

		// JS date is 0-indexed
		newDate.setDate(intermediateShape.day);
		newDate.setMonth(intermediateShape.month);
		newDate.setFullYear(intermediateShape.year);
		newDate.setHours(0);
		newDate.setMinutes(0);
		newDate.setSeconds(0);
		return { date: newDate, type: 'empty' };
	};

	const calendarDates = days.filter(isIntermediateShape).map(toCalendarDate);

	// if (month === 0) {
	// 	console.log(calendarDates);
	// }
	return calendarDates;
};

function isIntermediateShape(input: false | IntermediateShape): input is IntermediateShape {
	return input !== false;
}

export interface IntermediateShape {
	day: number;
	weekDay: number;
	month: number;
	year: number;
}
