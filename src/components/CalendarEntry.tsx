import * as React from 'react';
import styled from 'styled-components';
import { Typography, useThemeContext, Theme } from '@nickjmorrow/react-component-library';
import { CalendarDate } from 'types/CalendarDate';

export const CalendarEntry: React.FC<{ calendarEntry: CalendarDate; isInCurrentMonth: boolean }> = ({
	calendarEntry,
	isInCurrentMonth,
}) => {
	const theme = useThemeContext();
	return (
		<StyledCalendarEntry theme={theme}>
			<StyledTypography isInCurrentMonth={isInCurrentMonth}>{calendarEntry.day}</StyledTypography>
		</StyledCalendarEntry>
	);
};

const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
	color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled('div')<{ theme: Theme }>`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color ${p => p.theme.transitions.fast};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	&:hover {
		background-color: ${p => p.theme.colors.accent.cs3};
		transition: background-color ${p => p.theme.transitions.fast};
		cursor: pointer;
	}
	&:focus {
		background-color: ${p => p.theme.colors.accent.cs5};
		transition: background-color ${p => p.theme.transitions.fast};
		cursor: pointer;
	}
`;
