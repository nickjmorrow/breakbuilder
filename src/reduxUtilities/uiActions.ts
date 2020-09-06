import { action } from 'typesafe-actions';
import { EmptyDate } from '~/types/EmptyDate';
import { SelectedDate } from '~/types/SelectedDate';
import { SaveResponse } from '~/types/SaveResponse';
import { VacationPlanModel } from '~/types/apiContracts/VacationPlanModel';
import { CreateVacationPlanRequestModel } from '~/types/apiContracts/CreateVacationPlanRequestModel';
import { HolidayDate } from '~/types/HolidayDate';

export enum UiActionKeys {
    TOGGLE_DATE = 'TOGGLE_DATE',
    SET_YEAR = 'SET_YEAR',
    SET_MONTH = 'SET_MONTH',
}

const toggleDate = (date: EmptyDate | SelectedDate | HolidayDate) => action(UiActionKeys.TOGGLE_DATE, date);

const setYear = (year: number) => action(UiActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(UiActionKeys.SET_MONTH, month);

export const uiActions = {
    toggleDate,
    setYear,
    setMonth,
};
