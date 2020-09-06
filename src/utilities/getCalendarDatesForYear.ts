import { getCalendarDatesForMonth } from '~/utilities/getCalendarDatesForMonth';
import { CalendarDate } from '~/types/CalendarDate';
import Holidays from 'date-holidays';
import { getHolidayDate } from '~/dateTypeProviders/getHolidayDate';

export const getCalendarDatesForYear = (year: number): CalendarDate[] => {
    const hd = new Holidays('US', 'ny', 'ny').getHolidays(year).filter(d => d.type === 'public');
    const holidayDates = hd.map(hd => new Date(hd.date));
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce<CalendarDate[]>((agg, month) => {
        agg = [
            ...agg,
            ...getCalendarDatesForMonth(year, month).map(cd =>
                isHoliday(cd.date, holidayDates) ? getHolidayDate(cd) : cd,
            ),
        ];
        return agg;
    }, []);
};

const isHoliday = (date: Date, holidayDates: Date[]) => holidayDates.some(hd => isSameDate(hd, date));

const isSameDate = (firstDate: Date, secondDate: Date) => {
    return (
        firstDate.getUTCDate() === secondDate.getUTCDate() &&
        firstDate.getUTCMonth() === secondDate.getUTCMonth() &&
        firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
    );
};
