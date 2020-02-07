import { Button } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import { push } from 'react-router-redux';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppState } from 'reduxUtilities/AppState';
import { uiActions } from 'reduxUtilities/uiActions';
import { CreateVacationPlanRequestModel } from 'types/apiContracts/CreateVacationPlanRequestModel';
import { getVacationPlanUrl } from 'utilities/getVacationPlanUrl';

const SaveButtonInternal: React.FC<ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps> &
	RouteComponentProps> = ({ calendarDates, createVacationPlan, location }) => {
	const dispatch = useDispatch();
	const url = getVacationPlanUrl(location.pathname);
	const isBaseUrl = url === '';

	const text = isBaseUrl ? 'Save' : 'Update';
	const handleClick = isBaseUrl ? () => createVacationPlan({ calendarDates }) : () => updateVacationPlan();

	const updateVacationPlan = () => dispatch(uiActions.updateVacationPlan.request({ url, calendarDates }));

	return (
		<Button colorVariant={'accent'} onClick={handleClick}>
			{text}
		</Button>
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
