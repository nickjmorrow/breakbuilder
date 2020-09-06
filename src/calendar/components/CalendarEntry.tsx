// external
import React from 'react';
import styled from 'styled-components';
import { Typography } from '~/core';
import { InteractionState } from '~/core/InteractionState';
import { Theme } from '~/theming';
import { isConnectedDate } from '~/calendar/typeGuards/isConnectedDate';
import { isHolidayDate } from '~/calendar/typeGuards/isHolidayDate';
import { isSelectedDate } from '~/calendar/typeGuards/isSelectedDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { isWeekend } from '~/calendar/utilities/isWeekend';

const CalendarEntryInternal: React.FC<{
    calendarDate: CalendarDate;
    isInCurrentMonth: boolean;
    setMonth: (month: number) => void;
    toggleDate: (calendarDate: EmptyDate | SelectedDate | HolidayDate) => void;
}> = ({ calendarDate, toggleDate, setMonth, isInCurrentMonth }) => {
    return (
        <StyledCalendarEntry
            calendarDate={calendarDate}
            onClick={() => {
                if (isConnectedDate(calendarDate)) {
                    return;
                }

                if (!isInCurrentMonth) {
                    setMonth(calendarDate.date.getMonth());
                }
                toggleDate(calendarDate);
            }}
        >
            <StyledTypography colorVariant={'primaryLight'} isInCurrentMonth={isInCurrentMonth}>
                {calendarDate.date.getDate()}
            </StyledTypography>
        </StyledCalendarEntry>
    );
};

export const CalendarEntry = React.memo(CalendarEntryInternal, (prevProps, nextProps) => {
    return prevProps.calendarDate === nextProps.calendarDate;
});

// css
const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
    color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled.div<{
    calendarDate: CalendarDate;
}>`
    width: 40px;
    height: 40px;
    margin: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${p => (isWeekend(p.calendarDate) ? 'not-allowed' : 'pointer')};
    transition: background-color ${p => p.theme.transitions.fast};
    border-radius: ${p => p.theme.borderRadius.br1};
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

const getBackgroundColor = (uiState: InteractionState, calendarDate: CalendarDate, theme: Theme) => {
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
        return theme.accentColor.cs2;
    }

    return 'hsla(0, 0%, 100%, 0.7)';
};
