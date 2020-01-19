import { CalendarDate } from "types/CalendarDate";
import { getSuggestedDate } from "dateTypeProviders/getSuggestedDate";
import { getMostEvenSelection } from "utilities/evenSelectionCreation/getMostEvenSelection";
import { isSelectedDate } from "typeGuards/isSelectedDate";

export const getUpdatedSuggestedDates = (
  dates: CalendarDate[],
  numVacationDaysToAssign: number
): CalendarDate[] => {
  const currentEntries = dates.map(isSelectedDate);
  const updatedEntries = getMostEvenSelection(
    currentEntries,
    numVacationDaysToAssign
  );
  const isNewlyAdded = currentEntries.map(
    (cd, i) => updatedEntries[i] && cd !== updatedEntries[i]
  );
  return dates.map((d, i) => {
    return isNewlyAdded[i] ? getSuggestedDate(d) : d;
  });
};
