import { CalendarDate } from '~/calendar/types/CalendarDate';
import { HolidayDate } from '~/calendar/types/HolidayDate';
import { SelectedDate } from '~/calendar/types/SelectedDate';
import { EmptyDate } from '~/calendar/types/EmptyDate';
import { isConnectedDate } from '~/calendar/typeGuards/isConnectedDate';

const toCalendarDate = (testDate: TestDate): CalendarDate => {
    const d = new Date();
    d.setFullYear(testDate.year);
    d.setMonth(testDate.month);
    d.setDate(testDate.day);
    return {
        date: d,
        type: testDate.type,
    };
};

const toTestDate = (calendarDate: CalendarDate): TestDate => ({
    day: calendarDate.date.getDate(),
    month: calendarDate.date.getMonth(),
    year: calendarDate.date.getFullYear(),
    type: calendarDate.type,
});

const toInteractableDate = (testDate: InteractableTestDate): EmptyDate | HolidayDate | SelectedDate => {
    const output = toCalendarDate(testDate);
    if (isConnectedDate(output)) {
        throw new Error('Should not be connected date.');
    }
    return output;
};

export const testUtilities = {
    toCalendarDate,
    toTestDate,
    toInteractableDate,
};

interface InteractableTestDate extends TestDate {
    type: 'holiday' | 'selected' | 'empty';
}

export interface TestDate {
    day: number;
    month: number;
    year: number;
    type: 'holiday' | 'selected' | 'empty' | 'connected';
}
