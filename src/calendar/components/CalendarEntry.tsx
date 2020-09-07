// external
import React from 'react';
import styled, { css } from 'styled-components';
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
import { calendarActions } from '~/calendar/state/calendarActions';

const CalendarEntryInternal: React.FC<{
    calendarDate: CalendarDate;
    isInCurrentMonth: boolean;
    setMonth: (month: number) => void;
    toggleDate: typeof calendarActions.toggleDate;
}> = ({ calendarDate, toggleDate, setMonth, isInCurrentMonth }) => {
    const [isHovering, setIsHovering] = React.useState(false);
    return (
        <StyledCalendarEntry
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            calendarDate={calendarDate}
            onClick={() => {
                if (isConnectedDate(calendarDate)) {
                    return;
                }

                if (!isInCurrentMonth) {
                    setMonth(calendarDate.date.getMonth());
                }
                toggleDate({ date: calendarDate, target: 'selected' });
            }}
        >
            <HolidaySection
                isHovering={isHovering && !isConnectedDate(calendarDate)}
                onClick={e => {
                    e.stopPropagation();
                    if (isConnectedDate(calendarDate)) {
                        return;
                    }
                    if (!isInCurrentMonth) {
                        setMonth(calendarDate.date.getMonth());
                    }
                    toggleDate({ date: calendarDate, target: 'holiday' });
                }}
            />
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
    position: relative;
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

const HolidaySection = styled.div<{ isHovering: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: ${p => p.theme.borderRadius.br1};
    background-color: ${p => p.theme.accentColor.cs5};
    width: 10px;
    height: 10px;
    transition: all ${p => p.theme.transitions.fast};
    ${p => css`
        visibility: ${p.isHovering ? 'normal' : 'hidden'};
        transition: all ${p => p.theme.transitions.fast};
    `}
`;

const lightness = 70.9;

const getBackgroundColor = (uiState: InteractionState, calendarDate: CalendarDate, theme: Theme) => {
    if (isConnectedDate(calendarDate)) {
        return `hsla(254.2, 90%, ${lightness}%, 0.4)`;
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
        return theme.coreColor.cs2;
    }

    return 'hsla(0, 0%, 100%, 0.7)';
};
