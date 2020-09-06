import { Calendar as CalendarUtil } from 'calendar-base';
import { EmptyDate } from '~/calendar/types/EmptyDate';

export const getCalendarDatesForMonth = (year: number, month: number): EmptyDate[] => {
    const calendarUtil = new CalendarUtil();

    const days = calendarUtil.getCalendar(year, month);
    const toCalendarDate = (intermediateShape: IntermediateShape): EmptyDate => {
        const newDate = new Date();

        newDate.setUTCFullYear(intermediateShape.year);
        newDate.setUTCMonth(intermediateShape.month);
        newDate.setUTCDate(intermediateShape.day);
        newDate.setUTCHours(0);
        newDate.setUTCMinutes(newDate.getTimezoneOffset());
        newDate.setUTCSeconds(0);

        return { date: newDate, type: 'empty' };
    };

    const calendarDates = days.filter(isIntermediateShape).map(toCalendarDate);

    return calendarDates;
};

function isIntermediateShape(input: false | IntermediateShape): input is IntermediateShape {
    return input !== false;
}

export interface IntermediateShape {
    day: number;
    weekDay: number;
    month: number;
    year: number;
}
