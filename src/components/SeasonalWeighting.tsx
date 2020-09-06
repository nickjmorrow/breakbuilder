import * as React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '~/core/Typography';
import { CalendarDate } from '~/types/CalendarDate';
import { isVacationDate } from '~/typeGuards/isVacationDate';
import { RootState } from '~/reduxUtilities/rootReducer';
import styled from 'styled-components';

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const monthSeasonMapping: { [k in Season]: Month[] } = {
    Spring: [2, 3, 4],
    Summer: [5, 6, 7],
    Fall: [8, 9, 10],
    Winter: [0, 1, 11],
};

interface SeasonInfo {
    label: Season;
    numDatesInSeason: number;
}

type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export const SeasonalWeighting: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
    const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
    const calendarDates = useSelector((state: RootState) => state.ui.calendarDates);
    const seasonInfos = seasons.map(s => ({ label: s, numDatesInSeason: getNumDatesInSeason(calendarDates, s) }));
    const maxDates = seasonInfos.reduce((agg, cur) => Math.max(cur.numDatesInSeason, agg), 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', ...style }}>
            {seasonInfos.map((s, i) => {
                return (
                    <div
                        key={s.label}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            <Typography colorVariant={'primaryLight'}>{s.label}</Typography>
                        </div>
                        <Box
                            style={{
                                height: '40px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            key={i}
                            index={i}
                            maxDates={maxDates}
                            seasonInfo={s}
                            numBoxes={seasons.length}
                        >
                            <Typography colorVariant={'primaryLight'}>{s.numDatesInSeason}</Typography>
                        </Box>
                    </div>
                );
            })}
        </div>
    );
};

const getNumDatesInSeason = (calendarDates: CalendarDate[], season: Season): number => {
    const months = monthSeasonMapping[season];
    return calendarDates.filter(cd => months.some(m => m === cd.date.getMonth() && isVacationDate(cd))).length;
};

const Box = styled('div')<{ index: number; numBoxes: number; maxDates: number; seasonInfo: SeasonInfo }>`
	border: 2px solid white;
	padding-left: -10px;
	${p => getBorderCss(p.index, p.numBoxes)}
	${p => getBorderRadiusCss(p.index, p.numBoxes, p.theme.borderRadius.br2)}
	${p => getBackgroundColorCss(p.seasonInfo.numDatesInSeason, p.maxDates)}
`;

const getBackgroundColorCss = (numDatesInSeason: number, maxDates: number) => {
    const maximumTransparency = 0.3;
    const actualTransparency = (numDatesInSeason / maxDates) * maximumTransparency;
    return `
		background-color: hsla(0, 0%, 100%, ${actualTransparency});
		transition: background-color 500ms;
	`;
};

const getBorderRadiusCss = (index: number, numBoxes: number, borderRadius: string) => {
    if (index === 0) {
        return `
			border-top-left-radius: ${borderRadius};
			border-bottom-left-radius: ${borderRadius};
		`;
    }

    if (index === numBoxes - 1) {
        return `
			border-top-right-radius: ${borderRadius};
			border-bottom-right-radius: ${borderRadius};
		`;
    }
};

const getBorderCss = (index: number, numBoxes: number) => {
    let css = ``;

    if (index > 0) {
        css += `border-right: 0.5px solid white;`;
    }

    if (index < numBoxes - 1) {
        css += `border-left: 0.5px solid white;`;
    }

    return css;
};
