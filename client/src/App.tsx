import {
	ArgumentType,
	getThemeFromNewInputs,
	ThemeContext,
	updateThemeInputs,
} from '@nickjmorrow/react-component-library';
import { Main } from 'components/Main';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from 'reduxUtilities/rootReducer';
import { uiActions } from 'reduxUtilities/uiActions';
import { getVacationPlanUrl } from 'utilities/getVacationPlanUrl';
import './App.css';

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
		},
	},
	colors: {
		core: {
			hue: 260,
			saturation: 100,
		},
		accent: {
			hue: 50,
			middleLightness: 47,
			saturation: 90,
		},
	},
	defaultShowBoxShadow: false,
};

const AppInternal: React.FC<RouteComponentProps> = ({ location }) => {
	const { getVacationPlanSuccess } = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();

	const { pathname } = location;

	const url = getVacationPlanUrl(pathname);

	const mayBeSavedVacationPlan = url !== '';

	// check if url exists in database
	if (mayBeSavedVacationPlan && getVacationPlanSuccess === null) {
		dispatch(uiActions.getVacationPlan.request(url));
	}

	return (
		<div className="App">
			<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
				<Main />
			</ThemeContext.Provider>
		</div>
	);
};

export const App = withRouter(AppInternal);
