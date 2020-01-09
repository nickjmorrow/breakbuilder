import { Throw } from 'utilities/Throw';

/**
 * Iterate through the distribution from the right and left.
 * Record how far away each group of entries is from other groups.
 * @param distribution
 */
export const getSpread = (distribution: boolean[]): number => {
	return 1 / getStdDev(getGaps(distribution));
};

const getGaps = (distribution: boolean[]): number[] => {
	const numAssignments = distribution.reduce((agg, cur) => {
		if (cur) {
			agg += 1;
		}
		return agg;
	}, 0);

	Throw.InvalidIf(numAssignments <= 1, `Number of assignments must be greater than 1, but was ${numAssignments}`);

	const gaps: number[] = [];

	let distanceFromLeft = 0;

	for (let i = 0; i < distribution.length; i++) {
		if (distribution[i]) {
			break;
		}
		distanceFromLeft += 1;
	}

	let distanceFromRight = 0;

	for (let i = distribution.length; i >= 0; i--) {
		if (distribution[i]) {
			break;
		}
		distanceFromRight += 1;
	}

	for (let i = 0; i < distribution.length; i++) {
		if (distribution[i] && !distribution[i - 1]) {
			let gapCounter = 0;
			let currentIndex = i;
			while (true) {
				gapCounter += 1;
				currentIndex -= 1;
				if (distribution[currentIndex]) {
					break;
				}
				if (i === 0) {
					gapCounter += distanceFromRight;
					break;
				}
			}
			gaps.push(gapCounter);
		}
	}

	for (let i = distribution.length; i >= 0; i--) {
		if (distribution[i] && !distribution[i + 1]) {
			let gapCounter = 0;
			let currentIndex = i;
			while (true) {
				gapCounter += 1;
				currentIndex += 1;
				if (distribution[currentIndex]) {
					break;
				}
				if (i === distribution.length) {
					gapCounter += distanceFromLeft;
					break;
				}
			}
			gaps.push(gapCounter);
		}
	}

	return gaps;
};

const getStdDev = (array: number[]) => {
	const n = array.length;
	const mean = array.reduce((a, b) => a + b) / n;
	const s = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
	return s;
};
