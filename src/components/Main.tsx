import * as React from 'react';
import { YearSelection } from 'components/YearSelection';
import { DateSelection } from 'components/DateSelection';
import { useThemeContext } from '@nickjmorrow/react-component-library';
import SEO from 'components/seo';

export const Main: React.FC = () => {
	const theme = useThemeContext();
	return (
		<div
			style={{
				backgroundColor: theme.colors.core.cs5,
				height: '100%',
				margin: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<SEO title="Home" />
			<YearSelection />
			<DateSelection />
		</div>
	);
};
