import { CalendarDate } from 'types/CalendarDate';

export interface HolidayDate extends CalendarDate {
	type: 'holiday';
	name: string;
}
