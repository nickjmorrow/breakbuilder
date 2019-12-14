import * as React from 'react';
import { getCalendarDates } from 'utilities/getCalendarDates';
import { CalendarEntry } from 'components/CalendarEntry';
import styled from 'styled-components';
import { useThemeContext, Typography, ChevronUpIcon } from '@nickjmorrow/react-component-library';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';
import { AppState } from 'reduxUtilities/AppState';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CalendarInternal: React.FC = () => {
	const [currentMonth, setCurrentMonth] = React.useState(6);
	const days = getCalendarDates(2019, currentMonth);
	const theme = useThemeContext();
	return (
		<StyledCalendar theme={theme}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<ChevronUpIcon
					onClick={() => setCurrentMonth(current => Math.max(0, current - 1))}
					style={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
				/>
				<Typography sizeVariant={5}>{monthNames[currentMonth]}</Typography>
				<ChevronUpIcon
					style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
					onClick={() => setCurrentMonth(current => Math.min(11, current + 1))}
				/>
			</div>
			<InnerCalendar theme={theme}>
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography sizeVariant={1}>{d}</Typography>
					</div>
				))}

				{days.map(d => (
					<CalendarEntry calendarDate={d} />
				))}
			</InnerCalendar>
		</StyledCalendar>
	);
};

// redux
const mapStateToProps = (state: AppState) => ({
	currenntYear: state.ui.currentYear,
	currentMonth: state.ui.currentMonth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setMonth: (month: number) => dispatch(uiActions.setMonth(month)),
});

export const Calendar = connect(mapStateToProps, mapDispatchToProps)(CalendarInternal);

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
	width: 300px;
	height: 300px;
`;
