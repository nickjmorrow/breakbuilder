import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxUtilities/rootReducer';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { Typography } from '@nickjmorrow/react-component-library';
import { isHolidayDate } from 'typeGuards/isHolidayDate';
import styled from 'styled-components';
import { SelectedDate } from 'types/SelectedDate';
import { ConnectedDate } from 'types/ConnectedDate';
import { HolidayDate } from 'types/HolidayDate';

export const DateTypeComparison: React.FC = () => {
	const selectedDates = useSelector((state: RootState) => state.ui.calendarDates.filter(isSelectedDate));
	const connectedDates = useSelector((state: RootState) => state.ui.calendarDates.filter(isConnectedDate));
	const holidayDates = useSelector((state: RootState) => state.ui.calendarDates.filter(isHolidayDate));

	const data = [
		{ label: 'Selected', dates: selectedDates },
		{ label: 'Connected', dates: connectedDates },
		{ label: 'Holiday', dates: holidayDates },
	];

	return (
		<BallContainer>
			{data.map(d => (
				<div>
					<Typography colorVariant={'primaryLight'}>{d.label}</Typography>
					<Ball backgroundColor={getBackgroundColor(d, data)}>
						<TextWrapper>
							<Typography colorVariant={'primaryLight'}>{d.dates.length}</Typography>
						</TextWrapper>
					</Ball>
				</div>
			))}
		</BallContainer>
	);
};

interface Datum {
	label: string;
	dates: (SelectedDate | ConnectedDate | HolidayDate)[];
}

const getBackgroundColor = (datum: Datum, data: Datum[]): string => {
	const numDatesForEach = data.map(d => d.dates.length);
	const max = numDatesForEach.reduce((agg, cur) => Math.max(agg, cur));
	const propOfMax = datum.dates.length / max;
	const maximumTransparency = 0.3;
	const actualTransparency = propOfMax * maximumTransparency;
	return `hsla(0, 0%, 100%, ${actualTransparency})`;
};

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const size = 70;

const Ball = styled('div')<{ backgroundColor: string }>`
	border: 2px solid white;
	width: ${size}px;
	height: ${size}px;
	border-radius: ${size}px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 14px;
	background-color: ${p => p.backgroundColor};
	transition: background-color 500ms;
`;

const BallContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
