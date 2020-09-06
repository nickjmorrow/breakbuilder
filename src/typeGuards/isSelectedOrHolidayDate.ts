import { isHolidayDate } from '~/typeGuards/isHolidayDate';
import { CalendarDate } from '~/types/CalendarDate';
import { HolidayDate } from '~/types/HolidayDate';
import { SelectedDate } from '~/types/SelectedDate';
import { isSelectedDate } from '~/typeGuards/isSelectedDate';

export const isSelectedOrHolidayDate = (calendarDate: CalendarDate): calendarDate is HolidayDate | SelectedDate => {
    return isSelectedDate(calendarDate) || isHolidayDate(calendarDate);
};
