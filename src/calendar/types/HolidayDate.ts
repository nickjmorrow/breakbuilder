import { WrappedDate } from '~/calendar/types/WrappedDate';

export interface HolidayDate extends WrappedDate {
    type: 'holiday';
}
