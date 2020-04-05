import { HolidayDate } from 'types/HolidayDate';
import { CalendarDate } from 'types/CalendarDate';

export const getHolidayDate = (calendarDate: CalendarDate): HolidayDate => ({
	...calendarDate,
	type: 'holiday',
});
