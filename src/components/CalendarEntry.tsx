import * as React from 'react';
import styled from 'styled-components';
import { Typography, useThemeContext, Theme, GetComponentProps, UIState } from '@nickjmorrow/react-component-library';
import { CalendarDate as ICalendarDate, CalendarDate } from 'types/CalendarDate';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { isWeekend } from 'utilities/isWeekend';

interface OwnProps {
	calendarDate: ICalendarDate;
}

const CalendarEntryInternal: React.FC<OwnProps &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>> = ({ calendarDate, toggleDate, isSelected, isInCurrentMonth }) => {
	const theme = useThemeContext();
	return (
		<StyledCalendarEntry
			isSelected={isSelected}
			calendarDate={calendarDate}
			theme={theme}
			onClick={() => isWeekend(calendarDate) && toggleDate(calendarDate)}
		>
			<StyledTypography isInCurrentMonth={isInCurrentMonth}>{calendarDate.day}</StyledTypography>
		</StyledCalendarEntry>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	toggleDate: (calendarDate: CalendarDate) => dispatch(uiActions.toggleDate(calendarDate)),
});

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
	isSelected: state.ui.selectedDates.some(sd => isCalendarDateEqual(sd, ownProps.calendarDate)),
	isInCurrentMonth: state.ui.currentMonth === ownProps.calendarDate.month,
});

export const CalendarEntry = connect(mapStateToProps, mapDispatchToProps)(CalendarEntryInternal);

const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
	color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled('div')<{
	theme: Theme;
	isSelected: boolean;
	calendarDate: CalendarDate;
}>`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${p => p => (isWeekend(p.calendarDate) ? 'not-allowed' : 'pointer')};
	transition: background-color ${p => p.theme.transitions.fast};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	background-color: ${p => getBackgroundColor('normal', p.isSelected, p.calendarDate, p.theme)};
	&:hover {
		background-color: ${p => getBackgroundColor('hover', p.isSelected, p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
	&:focus {
		background-color: ${p => getBackgroundColor('active', p.isSelected, p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
`;

// css
const getBorderBottomRadius = (currentMonth: number, calendarDate: CalendarDate, theme: Theme) => {
	if (!isWeekend(calendarDate)) {
		return theme.border.borderRadius.br1;
	}

	if (calendarDate.month > currentMonth) {
		return '0px';
	}
};

const getBackgroundColor = (uiState: UIState, isSelected: boolean, calendarDate: CalendarDate, theme: Theme) => {
	if (isWeekend(calendarDate)) {
		return theme.colors.neutral.cs3;
	}

	if (uiState === 'active' || isSelected) {
		return theme.colors.accent.cs5;
	}

	if (uiState === 'hover') {
		return theme.colors.accent.cs2;
	}

	return theme.colors.background;
};
