import { getConnectedDate } from '~/dateTypeProviders/getConnectedDate';
import { isConnectedDate } from '~/typeGuards/isConnectedDate';
import { CalendarDate } from '~/types/CalendarDate';
import { ConnectedDate } from '~/types/ConnectedDate';
import { WrappedDate } from '~/types/WrappedDate';
import { getEmptyDate } from '~/dateTypeProviders/getEmptyDate';
import { isCalendarDateEqual } from '~/utilities/isCalendarDateEqual';
import { isVacationDate } from '~/typeGuards/isVacationDate';
import { isSelectedOrHolidayDate } from '~/typeGuards/isSelectedOrHolidayDate';
import { isEmptyDate } from '~/typeGuards/isEmptyDate';

export const getUpdatedConnectedDates = (dates: CalendarDate[]): CalendarDate[] => {
    const updatedDates = dates.map((d, i) => {
        if (!isConnectedDate(d) && !isEmptyDate(d)) {
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

    if (day !== 0 && day !== 6) {
        return false;
    }

    if (!isConnectedDate(calendarDate) && !isEmptyDate(calendarDate)) {
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
