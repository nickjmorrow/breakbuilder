import { SelectedDate } from 'types/SelectedDate';
import { ConnectedDate } from 'types/ConnectedDate';
import { CalendarDate } from 'types/CalendarDate';
import { DateType } from 'types/DateType';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { holidayDates } from 'utilities/holidayDates';
import { Throw } from 'utilities/Throw';

export const getDateType = (
	calendarDate: CalendarDate,
	selectedDates: SelectedDate[],
	connectedDates: ConnectedDate[],
): DateType => {
	const isInDates = (dates: CalendarDate[], date: CalendarDate) => dates.some(d => isCalendarDateEqual(d, date));
	const isSelectedDate = isInDates(selectedDates, calendarDate);
	const isConnectedDate = isInDates(connectedDates, calendarDate);
	const isHolidayDate = isInDates(holidayDates, calendarDate);
	Throw.InvalidIf(
		[isSelectedDate, isConnectedDate, isHolidayDate].filter(m => m).length > 1,
		'Expected at most one match for date to dateType.',
	);

	if (isSelectedDate) {
		return 'selected';
	}
	if (isConnectedDate) {
		return 'connected';
	}
	if (isHolidayDate) {
		return 'holiday';
	}
	return 'none';
};
