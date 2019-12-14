import {
	ArgumentType,
	getThemeFromNewInputs,
	ThemeContext,
	updateThemeInputs,
	useThemeContext,
} from '@nickjmorrow/react-component-library';
import React from 'react';
import SEO from 'components/seo';
import { Calendar } from 'components/Calendar';

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
		},
	},
	defaultShowBoxShadow: false,
};

const IndexPage: React.FC = () => {
	const theme = useThemeContext();
	return (
		<div style={{ backgroundColor: theme.colors.core.cs5, height: '100vh', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
				<SEO title="Home" />
				<Calendar />
			</ThemeContext.Provider>
		</div>
	);
};

export default IndexPage;
