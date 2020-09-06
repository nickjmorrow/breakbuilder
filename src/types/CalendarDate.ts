import { EmptyDate } from '~/types/EmptyDate';
import { ConnectedDate } from '~/types/ConnectedDate';
import { HolidayDate } from '~/types/HolidayDate';
import { SelectedDate } from '~/types/SelectedDate';

export type CalendarDate = EmptyDate | ConnectedDate | HolidayDate | SelectedDate;
