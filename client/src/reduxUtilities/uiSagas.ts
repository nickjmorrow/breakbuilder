import axios from 'axios';
import { call, put, takeEvery, actionChannel } from 'redux-saga/effects';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { CalendarDate } from 'types/CalendarDate';
import { CalendarDateModel } from 'types/apiContracts/CalendarDateModel';
import { push } from 'react-router-redux';

function* getVacationPlanAsync(action: ReturnType<typeof uiActions.updateVacationPlan.request>) {
	try {
		const { data } = yield call(axios.get, `/vacationPlans`, {
			params: {
				url: action.payload,
			},
		});
		yield put(uiActions.getVacationPlan.success(data.result.value));
	} catch (error) {
		console.error(error);
		yield put(uiActions.getVacationPlan.failure(error));
	}
}

function* watchGetVacationPlanAsync() {
	yield takeEvery(UiActionKeys.GET_VACATION_PLAN, getVacationPlanAsync);
}

function* createVacationPlanAsync(action: ReturnType<typeof uiActions.createVacationPlan.request>) {
	try {
		const { data } = yield call(axios.post, '/vacationPlans', {
			...action.payload,
			calendarDates: getFilteredCalendarDates(action.payload.calendarDates),
		});

		action.meta(data.url);

		yield put(uiActions.createVacationPlan.success(data));
	} catch (error) {
		console.error(error);
	}
}

function* watchCreateVacationPlanAsync() {
	yield takeEvery(UiActionKeys.CREATE_VACATION_PLAN, createVacationPlanAsync);
}

const getType = (type: CalendarDate['type']) => {
	switch (type) {
		case 'empty':
			return 'empty';
		case 'selected':
			return 'selected';
		case 'holiday':
			return 'holiday';
		default:
			return 'empty';
	}
};

const getFilteredCalendarDates = (calendarDates: CalendarDate[]) =>
	calendarDates.map(cd => ({ ...cd, type: getType(cd.type) }));

function* updateVacationPlanAsync(action: ReturnType<typeof uiActions.updateVacationPlan.request>) {
	try {
		const { data } = yield call(axios.put, '/vacationPlans', {
			...action.payload,
			calendarDates: getFilteredCalendarDates(action.payload.calendarDates),
		});
		yield put(uiActions.updateVacationPlan.success(data));
	} catch (error) {
		console.error(error);
	}
}

function* watchUpdateVacationPlanAsync() {
	yield takeEvery(UiActionKeys.UPDATE_VACATION_PLAN, updateVacationPlanAsync);
}

export const uiSagas = [watchUpdateVacationPlanAsync, watchGetVacationPlanAsync, watchCreateVacationPlanAsync];
