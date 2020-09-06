import { HolidayDate } from '~/calendar/types/HolidayDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';

export const getHolidayDate = (calendarDate: CalendarDate): HolidayDate => ({
    ...calendarDate,
    type: 'holiday',
});
