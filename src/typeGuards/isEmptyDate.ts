import { EmptyDate } from '~/types/EmptyDate';
import { CalendarDate } from '~/types/CalendarDate';

export const isEmptyDate = (calendarDate: CalendarDate): calendarDate is EmptyDate =>
	(calendarDate as EmptyDate).type === 'empty';
