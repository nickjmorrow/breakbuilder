import { CalendarDate } from '~/calendar/types/CalendarDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';

export const isHolidayDate = (calendarDate: CalendarDate): calendarDate is HolidayDate =>
    (calendarDate as HolidayDate).type === 'holiday';
