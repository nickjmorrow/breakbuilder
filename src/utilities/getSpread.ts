import { Throw } from 'utilities/Throw';

export const getSpread = (distribution: boolean[]): number => {
	const numAssignments = distribution.reduce((agg, cur) => {
		if (cur) {
			agg += 1;
		}
		return agg;
	}, 0);

	if (numAssignments > 1) {
		Throw.InvalidIf(
			!(distribution[0] && distribution[distribution.length - 1]),
			`Because numAssignments (${numAssignments}) was greater than 1, expected distribution to have assignments at start and finish, but it did not. Distribution: ${distribution}.`,
		);
	}

	const gaps: number[] = [];
	let lastSeenIndex = 0;

	distribution.forEach((value, index) => {
		if (value) {
			gaps.push(index - lastSeenIndex);
			lastSeenIndex = index;
		}
	});

	lastSeenIndex = 0;

	[...distribution].reverse().forEach((value, index) => {
		if (value) {
			gaps.push(index - lastSeenIndex);
			lastSeenIndex = index;
		}
	});

	return 1 / getStdDev(gaps);
};

const getStdDev = (array: number[]) => {
	const n = array.length;
	const mean = array.reduce((a, b) => a + b) / n;
	const s = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
	return s;
};
