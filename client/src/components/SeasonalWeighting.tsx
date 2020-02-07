import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { Typography } from '@nickjmorrow/react-component-library';
import { CalendarDate } from 'types/CalendarDate';
import { isVacationDate } from 'typeGuards/isVacationDate';
import { RootState } from 'reduxUtilities/rootReducer';

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const monthSeasonMapping: { [k in Season]: Month[] } = {
	Spring: [2, 3, 4],
	Summer: [5, 6, 7],
	Fall: [8, 9, 10],
	Winter: [0, 1, 11],
};

type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export const SeasonalWeighting: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
	const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
	const calendarDates = useSelector((state: RootState) => state.ui.calendarDates);

	return (
		<div style={{ display: 'flex', flexDirection: 'row', ...style }}>
			{seasons.map(s => (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<div>
						<Typography colorVariant={'primaryLight'}>{s}</Typography>
					</div>
					<div
						style={{
							height: '40px',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography colorVariant={'primaryLight'}>{getNumDatesInSeason(calendarDates, s)}</Typography>
					</div>
				</div>
			))}
		</div>
	);
};

const getNumDatesInSeason = (calendarDates: CalendarDate[], season: Season): number => {
	const months = monthSeasonMapping[season];
	return calendarDates.filter(cd => months.some(m => m === cd.date.getMonth() && isVacationDate(cd))).length;
};
