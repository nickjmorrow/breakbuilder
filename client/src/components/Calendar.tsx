import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { useThemeContext, Typography, ChevronUpIcon } from '@nickjmorrow/react-component-library';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';
import { AppState } from 'reduxUtilities/AppState';
import { uiActions } from 'reduxUtilities/uiActions';
import { CalendarEntry } from 'components/CalendarEntry';

import { connect, useDispatch, useSelector } from 'react-redux';
import { CalendarDate } from 'types/CalendarDate';
import { RootState } from 'reduxUtilities/rootReducer';
import { getCalendarDatesForMonth } from 'utilities/getCalendarDatesForMonth';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Calendar: React.FC = () => {
	const theme = useThemeContext();
	const dispatch = useDispatch();
	const setMonth = (month: number) => dispatch(uiActions.setMonth(month));

	const currentMonth = useSelector((state: RootState) => state.ui.currentMonth);
	const currentYear = useSelector((state: RootState) => state.ui.currentYear);
	const calendarDates = useSelector((state: RootState) => state.ui.calendarDates);

	return (
		<StyledCalendar theme={theme}>
			<div
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}
			>
				<ChevronUpIcon
					onClick={() => setMonth(Math.max(0, currentMonth - 1))}
					style={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
				/>
				<Typography sizeVariant={5}>{monthNames[currentMonth]}</Typography>
				<ChevronUpIcon
					style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
					onClick={() => setMonth(Math.min(11, currentMonth + 1))}
				/>
			</div>
			<InnerCalendar theme={theme}>
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
					<div key={d} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography sizeVariant={1}>{d}</Typography>
					</div>
				))}

				{getPaddedCalendarDates(calendarDates, currentMonth, currentYear).map((d, i) => (
					<CalendarEntry key={i} calendarDate={d} />
				))}
			</InnerCalendar>
		</StyledCalendar>
	);
};

// utilities
const getPaddedCalendarDates = (calendarDates: CalendarDate[], currentMonth: number, currentYear: number) => {
	const monthDates = calendarDates.filter(cd => cd.date.getMonth() === currentMonth);
	const firstDateOfMonth = monthDates[0];
	const firstDayOfMonth = firstDateOfMonth.date.getDay();
	const numPreviousPaddingDays = firstDayOfMonth;
	const previousMonthDays = getPreviousMonthCalendarDates(currentMonth, currentYear);

	const previousDates = Array(numPreviousPaddingDays)
		.fill(null)
		.map((d, i) => {
			const previousMonthDateIndex = previousMonthDays.length - 1 - i;
			return previousMonthDays[previousMonthDateIndex];
		})
		.reverse();

	const lastDateOfMonth = monthDates[monthDates.length - 1];
	const lastDayOfMonth = lastDateOfMonth.date.getDay();
	const SATURDAY_INDEX = 6;
	const numNextPaddingDays = SATURDAY_INDEX - lastDayOfMonth;
	const nextMonthCalendarDates = getNextMonthCalendarDates(currentMonth, currentYear);

	const nextDates = Array(numNextPaddingDays)
		.fill(null)
		.map((d, i) => {
			const nextMonthDateIndex = i;
			return nextMonthCalendarDates[nextMonthDateIndex];
		});

	console.log(previousDates);
	console.log(monthDates);
	console.log(nextDates);

	return [...previousDates, ...monthDates, ...nextDates];
};

const getPreviousMonthCalendarDates = (currentMonth: number, currentYear: number) => {
	if (currentMonth === 0) {
		return getCalendarDatesForMonth(currentYear - 1, 11);
	}
	return getCalendarDatesForMonth(currentYear, currentMonth - 1);
};

const getNextMonthCalendarDates = (currentMonth: number, currentYear: number) => {
	if (currentMonth === 11) {
		return getCalendarDatesForMonth(currentYear + 1, 0);
	}
	return getCalendarDatesForMonth(currentYear, currentMonth + 1);
};

// css
const StyledCalendar = styled('div')<{ theme: Theme }>`
	background-color: white;
	border-radius: ${p => p.theme.border.borderRadius.br1};
	padding: ${p => p.theme.spacing.ss4};
`;

const InnerCalendar = styled('div')<{ theme: Theme }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: min-content;
	height: 360px;
`;
