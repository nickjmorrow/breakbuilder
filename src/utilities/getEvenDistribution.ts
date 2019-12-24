interface Result {
	distribution: boolean[];
	insertionPointIndices: number[];
	spread: number;
}

export const getEvenDistribution = (currentDistribution: boolean[], additionalEntries: number): Result => {
	return {
		distribution: currentDistribution,
		insertionPointIndices: [],
		spread: 0,
	};
};
