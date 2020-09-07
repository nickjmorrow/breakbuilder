import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, ChevronUpIcon } from '~/core';
import { calendarActions } from '~/calendar/state/calendarActions';
import { CalendarEntry } from '~/calendar/components/CalendarEntry';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { RootState } from '~/reduxUtilities/rootReducer';
import { MONTH_NAMES } from '~/core/constants/monthNames';
import { DAYS_OF_WEEK } from '~/core/constants/daysOfWeek';
import { FIRST_MONTH_INDEX } from '~/core/constants/firstMonthIndex';
import { LAST_MONTH_INDEX } from '~/core/constants/lastMonthIndex';
import { REQUIRED_DAYS_IN_CALENDAR } from '~/core/constants/requiredDaysInCalendar';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';

export const Calendar: React.FC = () => {
    const dispatch = useDispatch();

    const setMonth = (month: number) => dispatch(calendarActions.setMonth(month));
    const toggleDate = ({
        date,
        target,
    }: {
        date: EmptyDate | SelectedDate | HolidayDate;
        target: 'selected' | 'holiday';
    }) => dispatch(calendarActions.toggleDate({ date, target }));

    const currentMonth = useSelector((state: RootState) => state.ui.currentMonth);
    const currentYear = useSelector((state: RootState) => state.ui.currentYear);
    const calendarDates = useSelector((state: RootState) => state.ui.calendarDates);

    return (
        <StyledCalendar>
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}
            >
                <ChevronUpIcon
                    onClick={() => setMonth(currentMonth - 1)}
                    style={{ cursor: 'pointer', transform: 'rotate(-90deg)' }}
                />
                <Typography colorVariant={'primaryLight'}>{MONTH_NAMES[currentMonth]}</Typography>
                <ChevronUpIcon
                    style={{ cursor: 'pointer', transform: 'rotate(90deg)' }}
                    onClick={() => setMonth(currentMonth + 1)}
                />
            </div>
            <InnerCalendar>
                {DAYS_OF_WEEK.map(d => (
                    <div key={d} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography colorVariant={'primaryLight'}>{d}</Typography>
                    </div>
                ))}

                {getPaddedCalendarDates(calendarDates, currentMonth, currentYear).map((d, i) => (
                    <CalendarEntry
                        key={i}
                        calendarDate={d}
                        setMonth={setMonth}
                        toggleDate={toggleDate}
                        isInCurrentMonth={d.date.getMonth() === currentMonth}
                    />
                ))}
            </InnerCalendar>
        </StyledCalendar>
    );
};

// utilities
const getPaddedCalendarDates = (calendarDates: CalendarDate[], currentMonth: number, currentYear: number) => {
    // const t0 = performance.now();
    const currentMonthDates = calendarDates.filter(
        cd => cd.date.getMonth() === currentMonth && cd.date.getFullYear() === currentYear,
    );

    const firstDayOfMonth = currentMonthDates[0].date.getDay();

    const numPreviousPaddingDays = firstDayOfMonth;

    const previousMonthDays = getPreviousMonthCalendarDates(calendarDates, currentMonth, currentYear);

    const previousDates = Array(numPreviousPaddingDays)
        .fill(null)
        .map((d, i) => {
            const previousMonthDateIndex = previousMonthDays.length - 1 - i;
            return previousMonthDays[previousMonthDateIndex];
        })
        .reverse();

    const nextMonthCalendarDates = getNextMonthCalendarDates(calendarDates, currentMonth, currentYear);

    const numNextPaddingDays = REQUIRED_DAYS_IN_CALENDAR - (previousDates.length + currentMonthDates.length);

    const nextDates = Array(numNextPaddingDays)
        .fill(null)
        .map((d, i) => {
            const nextMonthDateIndex = i;
            return nextMonthCalendarDates[nextMonthDateIndex];
        });

    // console.log(performance.now() - t0);
    return [...previousDates, ...currentMonthDates, ...nextDates];
};

const getPreviousMonthCalendarDates = (
    calendarDates: CalendarDate[],
    currentMonth: number,
    currentYear: number,
): CalendarDate[] => {
    if (currentMonth === FIRST_MONTH_INDEX) {
        return getCalendarDatesForMonth(calendarDates, LAST_MONTH_INDEX, currentYear - 1);
    }

    return getCalendarDatesForMonth(calendarDates, currentMonth - 1, currentYear);
};

const getNextMonthCalendarDates = (
    calendarDates: CalendarDate[],
    currentMonth: number,
    currentYear: number,
): CalendarDate[] => {
    if (currentMonth === LAST_MONTH_INDEX) {
        return getCalendarDatesForMonth(calendarDates, FIRST_MONTH_INDEX, currentYear + 1);
    }

    return getCalendarDatesForMonth(calendarDates, currentMonth + 1, currentYear);
};

const getCalendarDatesForMonth = (
    calendarDates: CalendarDate[],
    currentMonth: number,
    currentYear: number,
): CalendarDate[] => {
    return calendarDates.filter(cd => cd.date.getMonth() === currentMonth && cd.date.getFullYear() === currentYear);
};

// css
const StyledCalendar = styled('div')`
    background-color: hsla(0, 0%, 90%, 0.2);
    border-radius: ${p => p.theme.borderRadius.br1};
    padding: ${p => p.theme.spacing.ss4};
`;

const InnerCalendar = styled('div')`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: min-content;
    height: 360px;
`;
