import { WrappedDate } from '~/calendar/types/WrappedDate';

export interface SelectedDate extends WrappedDate {
    type: 'selected';
}
