import { action } from 'typesafe-actions';
import { EmptyDate } from 'types/EmptyDate';
import { SelectedDate } from 'types/SelectedDate';
import { SuggestedDate } from 'types/SuggestedDate';
import { VacationPlan } from 'types/VacationPlan';
import { SaveResponse } from 'types/SaveResponse';
import { VacationPlanModel } from 'types/apiContracts/VacationPlanModel';
import { CreateVacationPlanRequestModel } from 'types/apiContracts/CreateVacationPlanRequestModel';

export enum UiActionKeys {
	ADD_DATE = 'ADD_DATE',
	REMOVE_DATE = 'REMOVE_DATE',
	TOGGLE_DATE = 'TOGGLE_DATE',
	SET_YEAR = 'SET_YEAR',
	SET_MONTH = 'SET_MONTH',
	GET_SUGGESTED_DATES = 'GET_SUGGESTED_DATES',
	SET_NUM_VACATION_DATES = 'SET_NUM_VACATION_DATES',
	UPDATE_VACATION_PLAN = 'UPDATE_VACATION_PLAN',
	UPDATE_VACATION_PLAN_SUCCESS = 'UPDATE_VACATION_PLAN_SUCCESS',
	CREATE_VACATION_PLAN = 'CREATE_VACATION_PLAN',
	CREATE_VACATION_PLAN_SUCCESS = 'CREATE_VACATION_PLAN_SUCCESS',
	GET_VACATION_PLAN = 'GET_VACATION_PLAN',
	GET_VACATION_PLAN_SUCCESS = 'GET_VACATION_PLAN_SUCCESS',
	GET_VACATION_PLAN_FAILURE = 'GET_VACATION_PLAN_FAILURE',
	DOES_VACATION_PLAN_EXIST_IN_DATABASE = 'DOES_VACATION_PLAN_EXIST_IN_DATABASE',
	DOES_VACATION_PLAN_EXIST_IN_DATABASE_SUCCESS = 'DOES_VACATION_PLAN_EXIST_IN_DATABASE_SUCCESS',
}

const addDate = (date: EmptyDate) => action(UiActionKeys.ADD_DATE, date);

const removeDate = (date: SelectedDate) => action(UiActionKeys.REMOVE_DATE, date);

const toggleDate = (date: EmptyDate | SelectedDate | SuggestedDate) => action(UiActionKeys.TOGGLE_DATE, date);

const setYear = (year: number) => action(UiActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(UiActionKeys.SET_MONTH, month);

const getSuggestedDates = () => action(UiActionKeys.GET_SUGGESTED_DATES);

const setNumVacationDates = (numVacationDates: number) => action(UiActionKeys.SET_NUM_VACATION_DATES, numVacationDates);

const updateVacationPlan = {
	request: (vacationPlan: VacationPlanModel) => action(UiActionKeys.UPDATE_VACATION_PLAN, vacationPlan),
	success: (saveResponse: SaveResponse) => action(UiActionKeys.UPDATE_VACATION_PLAN_SUCCESS, saveResponse),
};

const createVacationPlan = {
	request: (createVacationPlanModel: CreateVacationPlanRequestModel, callback: (url: string) => void) =>
		action(UiActionKeys.CREATE_VACATION_PLAN, createVacationPlanModel, callback),
	success: (vacationPlanModel: VacationPlanModel) =>
		action(UiActionKeys.CREATE_VACATION_PLAN_SUCCESS, vacationPlanModel),
};

const getVacationPlan = {
	request: (url: string) => action(UiActionKeys.GET_VACATION_PLAN, url),
	success: (vacationPlanModel: VacationPlanModel) =>
		action(UiActionKeys.GET_VACATION_PLAN_SUCCESS, vacationPlanModel),
	failure: (message: string) => action(UiActionKeys.GET_VACATION_PLAN_FAILURE, message),
};

export const uiActions = {
	addDate,
	removeDate,
	toggleDate,
	setYear,
	setMonth,
	getSuggestedDates,
	setNumVacationDates,
	updateVacationPlan,
	getVacationPlan,
	createVacationPlan,
};
