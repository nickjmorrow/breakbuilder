import { getVacationPossibilities } from 'utilities/getVacationPossibilities';
import { getSpread } from 'utilities/getSpread';

export const getMostEvenSelection = (input: boolean[], numDates: number): boolean[] => {
	const possibilities = getVacationPossibilities(input, numDates);

	const selectionSpreads = possibilities.map(s => ({
		selection: s,
		spread: getSpread(s),
	}));

	const maximumSpread = Math.max(...selectionSpreads.map(s => s.spread));
	return selectionSpreads.find(s => s.spread === maximumSpread)!.selection;
};
