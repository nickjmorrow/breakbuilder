import { VacationDate } from '~/calendar/types/VacationDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { isSelectedDate } from '~/calendar/typeGuards/isSelectedDate';
import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';
import { isConnectedDate } from '~/calendar/typeGuards/isConnectedDate';

export const isVacationDate = (calendarDate: CalendarDate): calendarDate is VacationDate =>
    [isSelectedDate, isHolidayDate, isConnectedDate].some(func => func(calendarDate));
