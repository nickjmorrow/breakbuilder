import * as React from 'react';
import { DateSelection } from 'components/DateSelection';
import { Footer } from 'components/Footer';
import { AppBar } from 'components/AppBar';
import { useThemeContext, Theme } from '@nickjmorrow/react-component-library';
import styled from 'styled-components';

export const Main: React.FC = () => {
	const theme = useThemeContext();
	return (
		<Wrapper theme={theme}>
			<AppBar />
			<div
				style={{
					margin: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					marginTop: '32px',
				}}
			>
				<DateSelection />
			</div>
			<div style={{ marginTop: '64px' }}>
				<Footer />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled('div')<{ theme: Theme }>`
	min-height: 100vh;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: ${p => p.theme.colors.core.cs5};
`;
