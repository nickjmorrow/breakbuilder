import { getConnectedDate } from 'dateTypeProviders/getConnectedDate';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { CalendarDate } from 'types/CalendarDate';
import { ConnectedDate } from 'types/ConnectedDate';
import { WrappedDate } from 'types/WrappedDate';
import { getEmptyDate } from 'dateTypeProviders/getEmptyDate';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { isSelectedDate } from 'typeGuards/isSelectedDate';

export const getUpdatedConnectedDates = (dates: CalendarDate[]): CalendarDate[] => {
	const connectedDates: ConnectedDate[] = [];
	const alreadyExists = (newDate: WrappedDate) => connectedDates.some(cd => isCalendarDateEqual(cd, newDate));
	const asConnectedDate = (calendarDate: WrappedDate): ConnectedDate => ({ ...calendarDate, type: 'connected' });
	const addIfNotExists = (newDate: WrappedDate) =>
		!alreadyExists(newDate) && connectedDates.push(asConnectedDate(newDate));
	dates
		.filter(d => isSelectedDate(d))
		.forEach(d => {
			if (d.date.getDay() === 5) {
				addIfNotExists({ date: getOffsetDate(d.date, 1) });
				addIfNotExists({ date: getOffsetDate(d.date, 2) });
			}
			if (d.date.getDay() === 1) {
				addIfNotExists({ date: getOffsetDate(d.date, -1) });
				addIfNotExists({ date: getOffsetDate(d.date, -2) });
			}
		});

	const isNewConnectedDate = (date: CalendarDate) => connectedDates.some(cd => isCalendarDateEqual(cd, date));

	const convertDate = (date: CalendarDate): CalendarDate => {
		if (isNewConnectedDate(date)) {
			return getConnectedDate(date);
		}

		// was connected, now it is empty
		if (isConnectedDate(date)) {
			return getEmptyDate(date);
		}

		return date;
	};

	return dates.map(convertDate);
};

const getOffsetDate = (date: Date, offset: number) => {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + offset);
	return newDate;
};
