import { getMostEvenSelection } from 'utilities/getMostEvenSelection';

export const getAddedEntriesForMostEvenSelection = (input: boolean[], numDates: number): boolean[] => {
	input[0] = true;
	input[input.length - 1] = true;
	const mostEvenSelection = getMostEvenSelection(input, numDates);
	return input.map((value, index) => value !== mostEvenSelection[index]);
};
