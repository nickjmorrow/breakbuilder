import { CalendarDate } from 'types/CalendarDate';

export interface SelectedDate extends CalendarDate {
	type: 'selected';
}
