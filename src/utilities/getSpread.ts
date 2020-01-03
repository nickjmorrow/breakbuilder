/**
 * Returns the average distance between entries in a distribution.
 */
export const getSpread = (distribution: boolean[]): number => {
	const lastSeenFromLeft: number[] = [];
	let lastSeenIndex = 0;

	distribution.forEach((value, index) => {
		if (value) {
			lastSeenFromLeft.push(index - lastSeenIndex);
			lastSeenIndex = index;
		}
	});

	lastSeenIndex = 0;

	distribution.reverse().forEach((value, index) => {
		if (value) {
			lastSeenFromLeft.push(index - lastSeenIndex);
			lastSeenIndex = index;
		}
	});

	const sum = (agg: number, cur: number) => agg + cur;
	return lastSeenFromLeft.reduce(sum) / lastSeenFromLeft.length;
};
