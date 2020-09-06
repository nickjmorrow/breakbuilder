import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { ConnectedDate } from '~/calendar/types/ConnectedDate';

export type VacationDate = HolidayDate | ConnectedDate | SelectedDate;
