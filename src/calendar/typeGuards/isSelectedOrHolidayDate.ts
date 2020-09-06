import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { isSelectedDate } from '~/calendar/typeGuards/isSelectedDate';

export const isSelectedOrHolidayDate = (calendarDate: CalendarDate): calendarDate is HolidayDate | SelectedDate => {
    return isSelectedDate(calendarDate) || isHolidayDate(calendarDate);
};
