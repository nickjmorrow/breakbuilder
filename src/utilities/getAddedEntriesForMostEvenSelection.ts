import { getMostEvenSelection } from 'utilities/getMostEvenSelection';

export const getAddedEntriesForMostEvenSelection = (input: boolean[], numDates: number): boolean[] => {
	// TODO: Reconsider whether it makes sense to bookend.
	input[0] = true;
	input[input.length - 1] = true;
	const mostEvenSelection = getMostEvenSelection(input, numDates);
	return input.map((value, index) => value !== mostEvenSelection[index]);
};
