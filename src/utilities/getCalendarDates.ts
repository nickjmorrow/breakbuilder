import { Calendar as CalendarUtil } from 'calendar-base';
import { CalendarDate } from 'types/CalendarDate';

export const getCalendarDates = (year: number, month: number): CalendarDate[] => {
	const calendarUtil = new CalendarUtil();
	const previousMonthDates = (month === 0
		? calendarUtil.getCalendar(year - 1, 11)
		: calendarUtil.getCalendar(year, month - 1)
	).filter(d => d !== false);

	const nextMonthDates = (month === 11
		? calendarUtil.getCalendar(year + 1, 0)
		: calendarUtil.getCalendar(year, month + 1)
	).filter(d => d !== false);

	const days = calendarUtil.getCalendar(year, month);

	const numPrecedingBufferDates = () => {
		let counter = 0;
		for (let i = 0; i < days.length; i++) {
			if (days[i] === false) {
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

	const precedingDates = previousMonthDates
		.slice(previousMonthDates.length - numPrecedingBufferDates(), previousMonthDates.length)
		.filter(isCalendarDate);

	const followingDates = nextMonthDates.slice(0, numFollowingBufferDates()).filter(isCalendarDate);

	return [...precedingDates, ...days.filter(isCalendarDate), ...followingDates];
};

function isCalendarDate(input: false | CalendarDate): input is CalendarDate {
	return input !== false;
}
