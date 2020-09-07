import { calendarReducer, CalendarState } from '~/calendar/state/calendarReducer';
import { calendarActions } from '~/calendar/state/calendarActions';
import { ActionType } from 'typesafe-actions';
import { TestDate, testUtilities } from '~/calendar/testUtilities';

const { toCalendarDate, toTestDate, toInteractableDate } = testUtilities;

describe('calendar reducer', () => {
    it('set month to prior month', () => {
        const state: CalendarState = {
            calendarDates: [],
            currentMonth: 6,
            currentYear: 2020,
        };
        const action = calendarActions.setMonth(5);
        const expected: CalendarState = {
            calendarDates: [],
            currentMonth: 5,
            currentYear: 2020,
        };
        testMacro(state, action, expected);
    });

    it('set month to next month', () => {
        const state: CalendarState = {
            calendarDates: [],
            currentMonth: 6,
            currentYear: 2020,
        };
        const action = calendarActions.setMonth(7);
        const expected: CalendarState = {
            calendarDates: [],
            currentMonth: 7,
            currentYear: 2020,
        };
        testMacro(state, action, expected);
    });

    it('set month to next month in next year', () => {
        const state: CalendarState = {
            calendarDates: [],
            currentMonth: 11,
            currentYear: 2020,
        };
        const action = calendarActions.setMonth(12);
        const expected: CalendarState = {
            calendarDates: [],
            currentMonth: 0,
            currentYear: 2021,
        };
        const { currentMonth, currentYear } = calendarReducer(state, action);
        expect({ currentMonth, currentYear }).toEqual({
            currentMonth: expected.currentMonth,
            currentYear: expected.currentYear,
        });
    });

    it('set month to prior month in previous year', () => {
        const state: CalendarState = {
            calendarDates: [],
            currentMonth: 0,
            currentYear: 2020,
        };
        const action = calendarActions.setMonth(-1);
        const expected: CalendarState = {
            calendarDates: [],
            currentMonth: 11,
            currentYear: 2019,
        };
        const { currentMonth, currentYear } = calendarReducer(state, action);
        expect({ currentMonth, currentYear }).toEqual({
            currentMonth: expected.currentMonth,
            currentYear: expected.currentYear,
        });
    });

    it('toggle date from empty to selected', () => {
        const initialCalendarDates: TestDate[] = [
            {
                day: 9,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 12,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 13,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 14,
                month: 6,
                year: 2020,
                type: 'empty',
            },
        ];

        const state: CalendarState = {
            calendarDates: initialCalendarDates.map(toCalendarDate),
            currentMonth: 6,
            currentYear: 2020,
        };

        const action = calendarActions.toggleDate({
            date: toInteractableDate({ day: 10, month: 6, year: 2020, type: 'empty' }),
            target: 'selected',
        });

        const expectedCalendarDates: TestDate[] = [
            {
                day: 9,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'selected',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'connected',
            },
            {
                day: 12,
                month: 6,
                year: 2020,
                type: 'connected',
            },
            {
                day: 13,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 14,
                month: 6,
                year: 2020,
                type: 'empty',
            },
        ];

        const expected: CalendarState = {
            calendarDates: expectedCalendarDates.map(toCalendarDate),
            currentMonth: 6,
            currentYear: 2020,
        };
        testMacro(state, action, expected);
    });

    it('toggle date from selected to empty', () => {
        const initialCalendarDates: TestDate[] = [
            {
                day: 9,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'selected',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'connected',
            },
            {
                day: 12,
                month: 6,
                year: 2020,
                type: 'connected',
            },
            {
                day: 13,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 14,
                month: 6,
                year: 2020,
                type: 'empty',
            },
        ];

        const state: CalendarState = {
            calendarDates: initialCalendarDates.map(toCalendarDate),
            currentMonth: 6,
            currentYear: 2020,
        };

        const action = calendarActions.toggleDate({
            date: toInteractableDate({ day: 10, month: 6, year: 2020, type: 'empty' }),
            target: 'selected',
        });

        const expectedCalendarDates: TestDate[] = [
            {
                day: 9,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 12,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 13,
                month: 6,
                year: 2020,
                type: 'empty',
            },
            {
                day: 14,
                month: 6,
                year: 2020,
                type: 'empty',
            },
        ];

        const expected: CalendarState = {
            calendarDates: expectedCalendarDates.map(toCalendarDate),
            currentMonth: 6,
            currentYear: 2020,
        };
        testMacro(state, action, expected);
    });
});

interface TestState {
    calendarDates: TestDate[];
    currentMonth: number;
    currentYear: number;
}

const testMacro = (state: CalendarState, action: ActionType<typeof calendarActions>, expected: CalendarState): void => {
    const actual = calendarReducer(state, action);
    const actualTestState: TestState = {
        currentMonth: actual.currentMonth,
        currentYear: actual.currentYear,
        calendarDates: actual.calendarDates.map(toTestDate),
    };
    const expectedTestDate: TestState = {
        currentMonth: expected.currentMonth,
        currentYear: expected.currentYear,
        calendarDates: expected.calendarDates.map(toTestDate),
    };

    expect(actualTestState).toEqual(expectedTestDate);
};
