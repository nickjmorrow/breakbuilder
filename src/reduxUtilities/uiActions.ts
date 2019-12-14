import { action } from 'typesafe-actions';
import { CalendarDate } from 'types/CalendarDate';

export enum UiActionKeys {
	ADD_DATE = 'ADD_DATE',
	REMOVE_DATE = 'REMOVE_DATE',
	TOGGLE_DATE = 'TOGGLE_DATE',
	SET_YEAR = 'SET_YEAR',
	SET_MONTH = 'SET_MONTH',
}

const addDate = (date: CalendarDate) => action(UiActionKeys.ADD_DATE, date);

const removeDate = (date: CalendarDate) => action(UiActionKeys.REMOVE_DATE, date);

const toggleDate = (date: CalendarDate) => action(UiActionKeys.TOGGLE_DATE, date);

const setYear = (year: number) => action(UiActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(UiActionKeys.SET_MONTH, month);

export const uiActions = {
	addDate,
	removeDate,
	toggleDate,
	setYear,
	setMonth,
};
