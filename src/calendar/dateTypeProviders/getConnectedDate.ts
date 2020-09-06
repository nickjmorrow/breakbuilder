import { CalendarDate } from '~/calendar/types/CalendarDate';
import { ConnectedDate } from '~/calendar/types/ConnectedDate';

export const getConnectedDate = (calendarDate: CalendarDate): ConnectedDate => ({
    ...calendarDate,
    type: 'connected',
});
