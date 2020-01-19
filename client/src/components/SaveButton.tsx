import { Button } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'reduxUtilities/AppState';
import { uiActions } from 'reduxUtilities/uiActions';
import { CreateVacationPlanRequestModel } from 'types/apiContracts/CreateVacationPlanRequestModel';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getVacationPlanUrl } from 'utilities/getVacationPlanUrl';
import { push } from 'react-router-redux';

const SaveButtonInternal: React.FC<ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps> &
	RouteComponentProps> = ({ calendarDates, getVacationPlan, createVacationPlan, location }) => {
	const dispatch = useDispatch();
	const url = getVacationPlanUrl(location.pathname);

	const updateVacationPlan = () => dispatch(uiActions.updateVacationPlan.request({ url, calendarDates }));

	return (
		<>
			<Button colorVariant={'accent'} onClick={() => getVacationPlan('some_url')}>
				Get
			</Button>
			<Button colorVariant={'accent'} onClick={() => createVacationPlan({ calendarDates })}>
				Create
			</Button>
			<Button colorVariant={'accent'} onClick={() => updateVacationPlan()}>
				Update
			</Button>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	calendarDates: state.ui.calendarDates,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getVacationPlan: (url: string) => dispatch(uiActions.getVacationPlan.request(url)),
	createVacationPlan: (createVacationPlanRequestModel: CreateVacationPlanRequestModel) =>
		dispatch(
			uiActions.createVacationPlan.request(createVacationPlanRequestModel, (url: string) => dispatch(push(url))),
		),
});

export const SaveButton = withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveButtonInternal));
