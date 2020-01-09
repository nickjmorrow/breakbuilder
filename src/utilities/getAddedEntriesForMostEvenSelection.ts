import { getMostEvenSelection } from 'utilities/getMostEvenSelection';

export const getAddedEntriesForMostEvenSelection = (input: boolean[], numDates: number): boolean[] => {
	const mostEvenSelection = getMostEvenSelection(input, numDates);
	return input.map((value, index) => value !== mostEvenSelection[index]);
};
