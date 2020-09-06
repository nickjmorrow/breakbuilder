import * as React from 'react';
import styled from 'styled-components';
import { Typography, useThemeContext, Theme, UIState } from '@nickjmorrow/react-component-library';
import { EmptyDate } from 'types/EmptyDate';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { isWeekend } from 'utilities/dateUtilities/isWeekend';
import { CalendarDate } from 'types/CalendarDate';
import { SelectedDate } from 'types/SelectedDate';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { isHolidayDate } from 'typeGuards/isHolidayDate';
import { numRemainingVacationDatesSelector } from 'reduxUtilities/uiSelectors';
import { HolidayDate } from 'types/HolidayDate';

interface OwnProps {
	calendarDate: CalendarDate;
}

const CalendarEntryInternal: React.FC<OwnProps &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>> = ({ calendarDate, numVacationDatesRemaining }) => {
	const theme = useThemeContext();
	const dispatch = useDispatch();
	const isInCurrentMonth = useSelector((state: AppState) => state.ui.currentMonth === calendarDate.date.getMonth());
	const toggleDate = (calendarDate: EmptyDate | SelectedDate | HolidayDate) =>
		dispatch(uiActions.toggleDate(calendarDate));
	const setMonth = () => dispatch(uiActions.setMonth(calendarDate.date.getMonth()));

	return (
		<StyledCalendarEntry
			calendarDate={calendarDate}
			theme={theme}
			onClick={() => {
				if (!isConnectedDate(calendarDate) && isInCurrentMonth) {
					toggleDate(calendarDate);
				}

				if (!isInCurrentMonth) {
					setMonth();
					toggleDate(calendarDate as EmptyDate);
				}
			}}
		>
			<StyledTypography isInCurrentMonth={isInCurrentMonth}>{calendarDate.date.getDate()}</StyledTypography>
		</StyledCalendarEntry>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	toggleDate: (calendarDate: EmptyDate | SelectedDate) => dispatch(uiActions.toggleDate(calendarDate)),
});

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
	isInCurrentMonth: state.ui.currentMonth === ownProps.calendarDate.date.getMonth(),
	numVacationDatesRemaining: numRemainingVacationDatesSelector(state),
});

export const CalendarEntry = connect(mapStateToProps, mapDispatchToProps)(CalendarEntryInternal);

// css
const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
	color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled('div')<{
	theme: Theme;
	calendarDate: CalendarDate;
}>`
	width: 40px;
	height: 40px;
	margin: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${p => p => (isWeekend(p.calendarDate) ? 'not-allowed' : 'pointer')};
	transition: background-color ${p => p.theme.transitions.fast};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	background-color: ${p => getBackgroundColor('normal', p.calendarDate, p.theme)};
	&:hover {
		background-color: ${p => getBackgroundColor('hover', p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
	&:focus {
		background-color: ${p => getBackgroundColor('active', p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
`;

const lightness = 70.9;

const getBackgroundColor = (uiState: UIState, calendarDate: CalendarDate, theme: Theme) => {
	if (isConnectedDate(calendarDate)) {
		return `hsla(254.2, 90%, ${lightness}%, 0.5)`;
	}
	if (isHolidayDate(calendarDate)) {
		return `hsla(200, 74.2%, ${lightness}%, 0.9)`;
	}
	if (isWeekend(calendarDate)) {
		return 'hsla(0, 0%, 76.9%, 0.5)';
	}

	if (isSelectedDate(calendarDate)) {
		return `hsla(254.2, 90%, ${lightness}%, 0.9)`;
	}

	if (uiState === 'hover') {
		return theme.colors.accent.cs2;
	}

	return 'hsla(0, 0%, 100%, 0.7)';
};