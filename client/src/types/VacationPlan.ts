import { EmptyDate } from 'types/EmptyDate';
import { HolidayDate } from 'types/HolidayDate';
import { SelectedDate } from 'types/SelectedDate';

export interface VacationPlan {
	dates: (EmptyDate | HolidayDate | SelectedDate)[];
}
