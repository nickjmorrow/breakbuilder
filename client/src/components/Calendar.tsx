import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeContext, Typography, ChevronUpIcon, Theme } from '@nickjmorrow/react-component-library';
import { uiActions } from 'reduxUtilities/uiActions';
import { CalendarEntry } from 'components/CalendarEntry';
import { CalendarDate } from 'types/CalendarDate';
import { RootState } from 'reduxUtilities/rootReducer';
import { getCalendarDatesForMonth } from 'utilities/getCalendarDatesForMonth';
import { MONTH_NAMES } from 'core/constants/monthNames';
import { DAYS_OF_WEEK } from 'core/constants/daysOfWeek';
import { FIRST_MONTH_INDEX } from 'core/constants/firstMonthIndex';
import { LAST_MONTH_INDEX } from 'core/constants/lastMonthIndex';
import { REQUIRED_DAYS_IN_CALENDAR } from 'core/constants/requiredDaysInCalendar';

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
					onClick={() => setMonth(Math.max(FIRST_MONTH_INDEX, currentMonth - 1))}
					style={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
				/>
				<Typography sizeVariant={5}>{MONTH_NAMES[currentMonth]}</Typography>
				<ChevronUpIcon
					style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
					onClick={() => setMonth(Math.min(LAST_MONTH_INDEX, currentMonth + 1))}
				/>
			</div>
			<InnerCalendar theme={theme}>
				{DAYS_OF_WEEK.map(d => (
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

	const firstDayOfMonth = monthDates[0].date.getDay();

	const numPreviousPaddingDays = firstDayOfMonth;

	const previousMonthDays = getPreviousMonthCalendarDates(currentMonth, currentYear);

	const previousDates = Array(numPreviousPaddingDays)
		.fill(null)
		.map((d, i) => {
			const previousMonthDateIndex = previousMonthDays.length - 1 - i;
			return previousMonthDays[previousMonthDateIndex];
		})
		.reverse();

	const nextMonthCalendarDates = getNextMonthCalendarDates(currentMonth, currentYear);

	const numNextPaddingDays = REQUIRED_DAYS_IN_CALENDAR - (previousDates.length + monthDates.length);

	const nextDates = Array(numNextPaddingDays)
		.fill(null)
		.map((d, i) => {
			const nextMonthDateIndex = i;
			return nextMonthCalendarDates[nextMonthDateIndex];
		});

	return [...previousDates, ...monthDates, ...nextDates];
};

const getPreviousMonthCalendarDates = (currentMonth: number, currentYear: number) => {
	if (currentMonth === FIRST_MONTH_INDEX) {
		return getCalendarDatesForMonth(currentYear - 1, LAST_MONTH_INDEX);
	}

	return getCalendarDatesForMonth(currentYear, currentMonth - 1);
};

const getNextMonthCalendarDates = (currentMonth: number, currentYear: number) => {
	if (currentMonth === LAST_MONTH_INDEX) {
		return getCalendarDatesForMonth(currentYear + 1, FIRST_MONTH_INDEX);
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
