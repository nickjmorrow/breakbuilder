import { getAddedEntriesForMostEvenSelection } from 'utilities/getAddedEntriesForMostEvenSelection';
import { CalendarDate } from 'types/CalendarDate';
import { isVacationDate } from 'typeGuards/isVacationDate';
import { getSuggestedDate } from 'dateTypeProviders/getSuggestedDate';

export const getUpdatedDates = (dates: CalendarDate[], numVacationDays: number): CalendarDate[] => {
	const convertedEntries = dates.map(isVacationDate);
	const addedEntries = getAddedEntriesForMostEvenSelection(convertedEntries, numVacationDays);
	return dates.map((d, i) => {
		return addedEntries[i] ? getSuggestedDate(d) : d;
	});
};
