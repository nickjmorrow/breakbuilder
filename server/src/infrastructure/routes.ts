import { databaseSettingsRoutes } from '../components/databaseSettings';
import { vacationPlanRoutes } from '../components/vacationPlans/vacationPlanRoutes';

export const routes = [...databaseSettingsRoutes, ...vacationPlanRoutes];
