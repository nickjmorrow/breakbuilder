import { ConnectedDate } from '~/calendar/types/ConnectedDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';

export const isConnectedDate = (calendarDate: CalendarDate): calendarDate is ConnectedDate =>
    (calendarDate as ConnectedDate).type === 'connected';
