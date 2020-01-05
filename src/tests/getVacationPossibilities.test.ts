import { getVacationPossibilities } from 'utilities/getVacationPossibilities';

const getInput = (arrayLength: number) => Array(arrayLength).fill(false);

describe('get vacation possibilities', () => {
	it('base', () => {
		expect(getVacationPossibilities(getInput(10), 3)).toEqual([
			[false, false, false, false, true, false, false, true, true, false],
			[false, false, false, false, true, false, true, false, true, false],
			[false, false, false, true, false, false, false, true, true, false],
			[false, false, true, false, false, true, false, false, true, false],
		]);
	});
});
