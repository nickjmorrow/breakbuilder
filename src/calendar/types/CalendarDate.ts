import { EmptyDate } from '~/calendar/types/EmptyDate';
import { ConnectedDate } from '~/calendar/types/ConnectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';

export type CalendarDate = EmptyDate | ConnectedDate | HolidayDate | SelectedDate;
