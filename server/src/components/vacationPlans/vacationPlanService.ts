import { VacationPlan } from './models/VacationPlan';
import { getConnection } from 'typeorm';
import { DateType } from './models/DateType';
import { HTTP400Error } from '../../infrastructure/utils/httpErrors';
import { getUniqueUrl } from './getUniqueUrl';
import { Result } from '../../typeUtilities/Result';

export interface VacationPlanModel {
	url: VacationPlan['url'];
	calendarDates: CalendarDateModel[];
}

interface CalendarDateModel {
	date: Date;
	type: DateType['name'];
}

export interface CreateVacationPlanRequestModel {
	calendarDates: CalendarDateModel[];
}

export const vacationPlanService = {
	getVacationPlan: async (url: VacationPlan['url']) => {
		const manager = getConnection().manager;

		const vacationPlan = await manager.findOne(VacationPlan, { url });

		if (vacationPlan === undefined) {
			throw new HTTP400Error(`No vacation plan found with url ${url}.`);
		}

		var calendarDates: CalendarDateModel[] = await manager.query(`
			SELECT
				vpd.calendar_date AS date
				, dt.name AS type
			FROM bb.vacation_plans vp
			JOIN bb.vacation_plan_dates vpd
				ON vp.vacation_plan_id = vpd.vacation_plan_id
				AND vp.url = '${url}'
			JOIN bb.date_types dt
				ON dt.date_type_id = vpd.date_type_id
			ORDER BY vpd.vacation_plan_date_id;
		`);

		return Result.value({
			url: url,
			calendarDates,
		});
	},
	createVacationPlan: async (calendarDates: CalendarDateModel[]): Promise<VacationPlanModel> => {
		const manager = getConnection().manager;

		const url = await getUniqueUrl();

		await manager.insert(VacationPlan, { url });

		const { vacationPlanId } = await manager.findOneOrFail(VacationPlan, { url });

		await manager.query(getVacationPlanDateInsertionQuery(vacationPlanId, calendarDates));

		return {
			url,
			calendarDates,
		};
	},
	updateVacationPlan: async (vacationPlanModel: VacationPlanModel) => {
		const manager = getConnection().manager;

		const { url, calendarDates } = vacationPlanModel;

		const { vacationPlanId } = await manager.findOneOrFail(VacationPlan, { url });

		await manager.query(`
			DELETE FROM bb.vacation_plan_dates
			WHERE vacation_plan_id = ${vacationPlanId};
		`);

		await manager.query(getVacationPlanDateInsertionQuery(vacationPlanId, calendarDates));

		return vacationPlanModel;
	},
};

const getVacationPlanDateInsertionQuery = (vacationPlanId: number, calendarDates: CalendarDateModel[]) => {
	const getDateTypeId = (input: 'empty' | 'selected' | 'holiday') => {
		switch (input) {
			case 'empty':
				return 1;
			case 'selected':
				return 2;
			case 'holiday':
				return 3;
			default:
				throw new Error(`Unexpected input: ${input}`);
		}
	};

	const query = `
		INSERT INTO bb.vacation_plan_dates (vacation_plan_id, calendar_date, date_type_id)
		VALUES
		${calendarDates.map(cd => `(${vacationPlanId}, '${cd.date}', ${getDateTypeId(cd.type)})`).join('\n,')};
	`;

	return query;
};
