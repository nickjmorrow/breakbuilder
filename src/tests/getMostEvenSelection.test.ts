import { getMostEvenSelection } from 'utilities/getMostEvenSelection';

const getInput = (arrayLength: number): false[] => Array(arrayLength).fill(false);

describe('get most even selection', () => {
	it('base', () => {
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
});
