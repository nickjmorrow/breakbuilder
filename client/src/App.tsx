import React from 'react';
import { Clicker } from 'Clicker';
import {
	updateThemeInputs,
	ArgumentType,
	ThemeContext,
	getThemeFromNewInputs,
} from '@nickjmorrow/react-component-library';

import './App.css';
import { Main } from 'components/Main';

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

const App: React.FC = () => {
	return (
		<div className="App">
			<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
				<Main />
			</ThemeContext.Provider>
		</div>
	);
};

export default App;
