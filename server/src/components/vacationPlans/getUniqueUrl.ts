import { getConnection } from 'typeorm';
import { VacationPlan } from './models/VacationPlan';

export const getUniqueUrl = async (): Promise<string> => {
	const manager = getConnection().manager;

	let randomId = getRandomId();

	while (await idAlreadyExists(randomId)) {
		randomId = getRandomId();
	}

	return randomId;
};

const idAlreadyExists = async (id: string): Promise<boolean> => {
	const manager = getConnection().manager;
	const vacationPlan = await manager.find(VacationPlan, { url: id });
	return vacationPlan.length !== 0;
};

const getRandomId = () =>
	Math.random()
		.toString(36)
		.substr(2, 9);
