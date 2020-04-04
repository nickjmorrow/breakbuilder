import * as React from 'react';
import { PopulatedFooter, useThemeContext } from '@nickjmorrow/react-component-library';

export const Footer: React.FC = () => {
	const theme = useThemeContext();
	return <PopulatedFooter style={{ padding: '8px', color: 'white', backgroundColor: theme.colors.core.cs6 }} />;
};
