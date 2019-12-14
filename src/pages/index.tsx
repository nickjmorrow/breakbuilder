import {
	ArgumentType,
	getThemeFromNewInputs,
	ThemeContext,
	updateThemeInputs,
	useThemeContext,
} from '@nickjmorrow/react-component-library';
import React from 'react';
import { Main } from 'components/Main';
import 'components/reset.css';

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
			hue: 55,
		},
	},
	defaultShowBoxShadow: false,
};

const IndexPage: React.FC = () => {
	const theme = useThemeContext();
	return (
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
			<Main />
		</ThemeContext.Provider>
	);
};

export default IndexPage;
