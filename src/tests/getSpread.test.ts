import { getSpread } from 'utilities/getSpread';

describe('getSpread', () => {
	it('handles 010', () => {
		expect(getSpread([false, true, false])).toBeCloseTo(Infinity);
	});
	it('handles 10001', () => {
		expect(getSpread([true, false, false, false, true])).toBeCloseTo(0.5);
	});

	it('throw when not bookended by assignments', () => {
		expect(() => getSpread([true, true, false])).toThrowError(
			'Because numAssignments (2) was greater than 1, expected distribution to have assignments at start and finish, but it did not. Distribution: true,true,false.',
		);
	});

	it('handles 1000100001', () => {
		expect(getSpread([true, false, false, false, true, false, false, false, false, true])).toBeCloseTo(0.46);
	});

	it('handles 1100000001', () => {
		expect(getSpread([true, true, false, false, false, false, false, false, false, true])).toBeCloseTo(0.28);
	});
});
