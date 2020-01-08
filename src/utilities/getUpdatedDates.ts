import { getAddedEntriesForMostEvenSelection } from 'utilities/getAddedEntriesForMostEvenSelection';
import { CalendarDate } from 'types/CalendarDate';
import { isVacationDate } from 'typeGuards/isVacationDate';
import { getSelectedDate } from 'dateTypeProviders/getSelectedDate';

export const getUpdatedDates = (dates: CalendarDate[], numVacationDays: number): CalendarDate[] => {
	const convertedEntries = dates.map(isVacationDate);
	const addedEntries = getAddedEntriesForMostEvenSelection(convertedEntries, numVacationDays);
	return dates.map((d, i) => {
		return addedEntries[i] ? getSelectedDate(d) : d;
	});
};
