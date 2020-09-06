import { SelectedDate } from '~/calendar/types/SelectedDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';

export const getSelectedDate = (calendarDate: CalendarDate): SelectedDate => ({
    ...calendarDate,
    type: 'selected',
});
