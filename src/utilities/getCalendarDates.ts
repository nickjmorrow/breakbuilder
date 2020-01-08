import { Calendar as CalendarUtil } from 'calendar-base';
import { EmptyDate } from 'types/EmptyDate';

export const getCalendarDates = (year: number, month: number): EmptyDate[] => {
	const calendarUtil = new CalendarUtil();
	const previousMonthDates = (month === 0
		? calendarUtil.getCalendar(year - 1, 11)
		: calendarUtil.getCalendar(year, month - 1)
	).filter(d => d);

	const nextMonthDates = (month === 11
		? calendarUtil.getCalendar(year + 1, 0)
		: calendarUtil.getCalendar(year, month + 1)
	).filter(d => d);

	const days = calendarUtil.getCalendar(year, month);

	const numPrecedingBufferDates = () => {
		let counter = 0;
		for (let i = 0; i < days.length; i++) {
			if (!days[i]) {
				counter += 1;
			} else {
				break;
			}
		}

		return counter;
	};

	const numFollowingBufferDates = () => {
		let counter = 0;
		for (let i = days.length - 1; i >= 0; i--) {
			if (days[i] === false) {
				counter += 1;
			} else {
				break;
			}
		}
		return counter;
	};

	const toCalendarDate = (intermediateShape: IntermediateShape): EmptyDate => {
		const newDate = new Date();
		newDate.setDate(intermediateShape.day);
		newDate.setMonth(intermediateShape.month);
		newDate.setFullYear(intermediateShape.year);
		return { ...intermediateShape, date: newDate };
	};

	const precedingDates = previousMonthDates
		.slice(previousMonthDates.length - numPrecedingBufferDates(), previousMonthDates.length)
		.filter(isIntermediateShape)
		.map(toCalendarDate);

	const followingDates = nextMonthDates
		.filter(isIntermediateShape)
		.slice(0, numFollowingBufferDates())
		.map(toCalendarDate);

	const monthDates = days.filter(isIntermediateShape).map(toCalendarDate);

	return [...precedingDates, ...monthDates, ...followingDates];
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
