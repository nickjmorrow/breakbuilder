import React from 'react';
import styled from 'styled-components';
import { calendarSelectors } from '~/calendar/state/calendarSelectors';
import { ConnectedDate } from '~/calendar/types/ConnectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { Typography } from '~/core/Typography';
import { useTypedSelector } from '~/reduxUtilities/useTypedSelector';

export const DateTypeComparison: React.FC = () => {
    const selectedDates = useTypedSelector(calendarSelectors.currentYearSelectedDates);
    const connectedDates = useTypedSelector(calendarSelectors.currentYearConnectedDates);
    const holidayDates = useTypedSelector(calendarSelectors.currentYearHolidayDates);

    const data = [
        { label: 'Selected', dates: selectedDates },
        { label: 'Connected', dates: connectedDates },
        { label: 'Holiday', dates: holidayDates },
    ];

    return (
        <BallContainer>
            {data.map(d => (
                <LabelBallContainer key={d.label}>
                    <Typography colorVariant={'primaryLight'}>{d.label}</Typography>
                    <Ball backgroundColor={getBackgroundColor(d, data)}>
                        <TextWrapper>
                            <Typography colorVariant={'primaryLight'}>{d.dates.length}</Typography>
                        </TextWrapper>
                    </Ball>
                </LabelBallContainer>
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

const LabelBallContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
