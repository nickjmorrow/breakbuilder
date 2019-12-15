class InvalidOperationError extends Error {
	name = 'InvalidOperationError';
	constructor(message: string) {
		super(message);
	}
}

export class Throw {
	static InvalidIf(condition: boolean, message: string) {
		if (condition) {
			throw new InvalidOperationError(message);
		}
	}
}
