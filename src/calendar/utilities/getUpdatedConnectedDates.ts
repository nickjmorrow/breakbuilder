import { isConnectedDate } from '~/calendar/typeGuards/isConnectedDate';
import { isEmptyDate } from '~/calendar/typeGuards/isEmptyDate';
import { isSelectedOrHolidayDate } from '~/calendar/typeGuards/isSelectedOrHolidayDate';
import { CalendarDate } from '~/calendar/types/CalendarDate';
import { isWeekend } from '~/calendar/utilities/isWeekend';

export const getUpdatedConnectedDates = (dates: CalendarDate[]): CalendarDate[] => {
    const updatedDates = dates.map((d, i) => {
        if (!isWeekend(d) || (!isConnectedDate(d) && !isEmptyDate(d))) {
            return d;
        }

        if (shouldBeConnected(i, dates)) {
            d.type = 'connected';
        } else {
            d.type = 'empty';
        }
        return d;
    });
    return updatedDates;
};

const shouldBeConnected = (index: number, allDates: CalendarDate[]): boolean => {
    const calendarDate = allDates[index];
    const day = calendarDate.date.getDay();

    if (!isWeekend(calendarDate) || (!isConnectedDate(calendarDate) && !isEmptyDate(calendarDate))) {
        return false;
    }

    const isSaturdayAndConnected =
        (day === 6 && safeGetIsFilledDay(index - 1, allDates)) || safeGetIsFilledDay(index + 2, allDates);
    const isSundayAndConnected =
        (day === 0 && safeGetIsFilledDay(index - 2, allDates)) || safeGetIsFilledDay(index + 1, allDates);

    return isSaturdayAndConnected || isSundayAndConnected;
};

const safeGetIsFilledDay = (index: number, allDates: CalendarDate[]): boolean => {
    if (index < 0 || index >= allDates.length) {
        return false;
    }

    const calendarDate = allDates[index];
    return isSelectedOrHolidayDate(calendarDate);
};
