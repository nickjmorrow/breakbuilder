import { getMostEvenSelection } from '~/utilities/evenSelectionCreation/getMostEvenSelection';

const getInput = (arrayLength: number): false[] => Array(arrayLength).fill(false);

describe('get most even selection', () => {
	it('handles existing entries', () => {
		expect(getMostEvenSelection([false, true, false, false, false, false, true], 3)).toEqual([]);
	});

	it('handles 10', () => {
		expect(getMostEvenSelection(getInput(10), 3)).toEqual([
			false,
			false,
			true,
			false,
			false,
			true,
			false,
			false,
			true,
			false,
		]);
	});

	it('handles 9', () => {
		expect(getMostEvenSelection(getInput(9), 3)).toEqual([
			false,
			false,
			true,
			false,
			false,
			true,
			false,
			true,
			false,
		]);
	});
});
