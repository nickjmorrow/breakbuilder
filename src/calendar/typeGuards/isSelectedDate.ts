import { SelectedDate } from '~/calendar/types/SelectedDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';

export const isSelectedDate = (calendarDate: CalendarDate): calendarDate is SelectedDate =>
    (calendarDate as SelectedDate).type === 'selected';
