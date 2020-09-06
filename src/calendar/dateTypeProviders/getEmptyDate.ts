import { CalendarDate } from '~/calendar/types/CalendarDate';
import { EmptyDate } from '~/calendar/types/EmptyDate';

export const getEmptyDate = (calendarDate: CalendarDate): EmptyDate => ({
    ...calendarDate,
    type: 'empty',
});
