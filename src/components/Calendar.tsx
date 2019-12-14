import * as React from 'react';
import { getCalendarDates } from 'utilities/getCalendarDates';
import { CalendarEntry } from 'components/CalendarEntry';
import styled from 'styled-components';
import { useThemeContext, Typography } from '@nickjmorrow/react-component-library';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';

export const Calendar: React.FC = () => {
	const currentMonth = 6;
	const days = getCalendarDates(2019, currentMonth);
	const theme = useThemeContext();
	return (
		<StyledCalendar theme={theme}>
			{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
				<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sizeVariant={1}>{d}</Typography></div>
			))}
			{days.map(d => (
				<CalendarEntry isInCurrentMonth={d.month === currentMonth} calendarEntry={d} />
			))}
		</StyledCalendar>
	);
};

const StyledCalendar = styled('div')<{ theme: Theme }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: min-content;
	background-color: white;
	padding: ${p => p.theme.spacing.ss4};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	width: 300px;
	height: 300px;
`;
