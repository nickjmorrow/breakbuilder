import * as React from 'react';
import styled from 'styled-components';
import { Typography, useThemeContext, Theme, UIState } from '@nickjmorrow/react-component-library';
import { CalendarDate } from 'types/CalendarDate';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { isWeekend } from 'utilities/isWeekend';
import { getDateType } from 'utilities/getDateType';
import { DateType } from 'types/DateType';

interface OwnProps {
	calendarDate: CalendarDate;
}

const CalendarEntryInternal: React.FC<OwnProps &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>> = ({ calendarDate, toggleDate, dateType, isInCurrentMonth }) => {
	const theme = useThemeContext();
	return (
		<StyledCalendarEntry
			dateType={dateType}
			calendarDate={calendarDate}
			theme={theme}
			onClick={() => !isWeekend(calendarDate) && toggleDate(calendarDate)}
		>
			<StyledTypography isInCurrentMonth={isInCurrentMonth}>{calendarDate.date.getDate()}</StyledTypography>
		</StyledCalendarEntry>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	toggleDate: (calendarDate: CalendarDate) => dispatch(uiActions.toggleDate(calendarDate)),
});

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
	isInCurrentMonth: state.ui.currentMonth === ownProps.calendarDate.date.getMonth(),
	dateType: getDateType(ownProps.calendarDate, state.ui.selectedDates, state.ui.connectedDates),
});

export const CalendarEntry = connect(mapStateToProps, mapDispatchToProps)(CalendarEntryInternal);

// css
const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
	color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled('div')<{
	theme: Theme;
	dateType: DateType;
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
	background-color: ${p => getBackgroundColor('normal', p.dateType, p.calendarDate, p.theme)};
	&:hover {
		background-color: ${p => getBackgroundColor('hover', p.dateType, p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
	&:focus {
		background-color: ${p => getBackgroundColor('active', p.dateType, p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
`;

const getBackgroundColor = (uiState: UIState, dateType: DateType, calendarDate: CalendarDate, theme: Theme) => {
	if (dateType === 'connected') {
		return theme.colors.accent.cs2;
	}
	if (dateType === 'holiday') {
		return theme.colors.core.cs2;
	}
	if (isWeekend(calendarDate)) {
		return theme.colors.neutral.cs3;
	}

	if (uiState === 'active' || dateType === 'selected') {
		return theme.colors.accent.cs5;
	}

	if (uiState === 'hover') {
		return theme.colors.accent.cs2;
	}

	return theme.colors.background;
};
