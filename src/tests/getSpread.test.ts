import { getSpread } from 'utilities/getSpread';

describe('getSpread', () => {
	it('handles 010', () => {
		expect(getSpread([false, true, false])).toBe(1);
	});
	it('handles 01010', () => {
		expect(getSpread([false, true, false, true, false])).toBe(1.5);
	});

	it('handles 01001', () => {
		expect(getSpread([false, true, false, false, true])).toBbe(3.5);
	});
});

[];
