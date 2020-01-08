import { getCalendarDatesForMonth } from 'utilities/getCalendarDatesForMonth';
import { EmptyDate } from 'types/EmptyDate';

export const getCalendarDatesForYear = (year: number): EmptyDate[] =>
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce<EmptyDate[]>((agg, month) => {
		console.log(getCalendarDatesForMonth(year, month));
		agg = [...agg, ...getCalendarDatesForMonth(year, month)];
		return agg;
	}, []);
