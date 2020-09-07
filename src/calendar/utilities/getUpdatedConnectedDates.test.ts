import { getUpdatedConnectedDates } from '~/calendar/utilities/getUpdatedConnectedDates';
import { TestDate, testUtilities } from '~/calendar/testUtilities';

const { toCalendarDate, toTestDate } = testUtilities;

describe('get updated connected dates', () => {
    it('updates weekend to be connected when friday is a selected date', () => {
        const dates: TestDate[] = [
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
                type: 'empty',
            },
        ];

        const expected: TestDate[] = [
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
        ];

        testMacro(dates, expected);
    });

    it('updates weekend to be empty when it is not surrounded by selected dates ', () => {
        const dates: TestDate[] = [
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
                type: 'connected',
            },
        ];

        const expected: TestDate[] = [
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
        ];

        testMacro(dates, expected);
    });

    it('updates weekend to be connected when friday is a holiday', () => {
        const dates: TestDate[] = [
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'holiday',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'empty',
            },
        ];

        const expected: TestDate[] = [
            {
                day: 10,
                month: 6,
                year: 2020,
                type: 'holiday',
            },
            {
                day: 11,
                month: 6,
                year: 2020,
                type: 'connected',
            },
        ];

        testMacro(dates, expected);
    });

    it('weekend stays connected even when friday is selected but monday is empty', () => {
        const dates: TestDate[] = [
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
        ];

        const expected: TestDate[] = [
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
        ];

        testMacro(dates, expected);
    });

    it('updates weekend to connected when monday is a holiday', () => {
        const dates: TestDate[] = [
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
                type: 'holiday',
            },
        ];

        const expected: TestDate[] = [
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
                type: 'holiday',
            },
        ];

        testMacro(dates, expected);
    });

    it('does not update already connected weekend that still has friday as selected', () => {
        const dates: TestDate[] = [
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
        ];

        const expected: TestDate[] = [
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
        ];

        testMacro(dates, expected);
    });
});

const testMacro = (testDates: TestDate[], expected: TestDate[]): void => {
    const actual = getUpdatedConnectedDates(testDates.map(toCalendarDate)).map(toTestDate);
    expect(actual).toEqual(expected);
};
