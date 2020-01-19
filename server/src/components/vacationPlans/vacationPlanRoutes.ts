import { Route } from '../../infrastructure/types';
import { vacationPlanService, CreateVacationPlanRequestModel, VacationPlanModel } from './vacationPlanService';
import { HTTP400Error } from '../../infrastructure/utils/httpErrors';
import { ArgumentType } from '../../typeUtilities/ArgumentType';

export const vacationPlanRoutes: Route[] = [
	{
		path: '/vacationPlans',
		method: 'get',
		handler: async (req, res) => {
			const getVacationPlanRequestModel: ArgumentType<typeof vacationPlanService.getVacationPlan>[0] =
				req.query.url;
			if (getVacationPlanRequestModel === undefined) {
				throw new HTTP400Error('Url not present on request params.');
			}

			res.json(await vacationPlanService.getVacationPlan(getVacationPlanRequestModel));
		},
	},
	{
		path: '/vacationPlans',
		method: 'post',
		handler: async (req, res) => {
			const createVacationPlanReqeuestModel: CreateVacationPlanRequestModel = req.body;
			const { calendarDates } = createVacationPlanReqeuestModel;
			res.json(await vacationPlanService.createVacationPlan(calendarDates));
		},
	},
	{
		path: '/vacationPlans',
		method: 'put',
		handler: async (req, res) => {
			const updateVacationPlanRequestModel: VacationPlanModel = req.body;
			res.json(await vacationPlanService.updateVacationPlan(updateVacationPlanRequestModel));
		},
	},
];
